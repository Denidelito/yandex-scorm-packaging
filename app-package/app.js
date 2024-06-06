// Подключение плагинов
import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import archiver from 'archiver';

// Конфиг сборки
import scoDefaultConfig from './sco.config.js'

const config = {
    standard: scoDefaultConfig.standard,
    name: scoDefaultConfig.name,
    id: scoDefaultConfig.id,
    patch: scoDefaultConfig.patch,
};

// Статичная шапка манифеста с ссылками
const imsManifestHeader = {
    SCORM2004: {
        xmlns: 'http://www.imsglobal.org/xsd/imscp_v1p1',
        'xmlns:adlcp': 'http://www.adlnet.org/xsd/adlcp_v1p3',
        'xmlns:adlseq': 'http://www.adlnet.org/xsd/adlseq_v1p3',
        'xmlns:adlnav': 'http://www.adlnet.org/xsd/adlnav_v1p3',
        'xmlns:imsss': 'http://www.imsglobal.org/xsd/imsss',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xmlns:lom': 'http://ltsc.ieee.org/xsd/LOM',
        identifier: 'com.scorm.manifesttemplates.scorm2004.4thEd',
        version: '1',
        'xsi:schemaLocation': '://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd http://ltsc.ieee.org/xsd/LOM lom.xsd',
    },
    SCORM12: {
        xmlns: 'http://www.imsproject.org/xsd/imscp_rootv1p1p2',
        'xmlns:adlcp': 'http://www.adlnet.org/xsd/adlcp_rootv1p2',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd',
        identifier: 'MANIFEST-2F09601B_9474_48C9_A940_230D6925273B',
        version: '1.0',
    },
};

// Шаблон пустого манифеста
const imsManifestTemplate = {
    manifest: {
        $: imsManifestHeader[config.standard],
        metadata: [],
        organizations: [],
        resources: {
            resource: []
        },
    },
};

// Функция копирования статичных файлов стандарта курса
function copyFilesToCourse(callback) {
    const sourceDir = './app-package/temp' + config.standard;

    fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${sourceDir}:`, err);
            return;
        }

        files = files.filter(file => file.isFile() && !/(^|\/)\.[^\/\.]/g.test(file.name));

        let copyCount = 0;

        if (files.length === 0) {
            console.log(`No files to copy from ${sourceDir}`);
            callback();
            return;
        }

        files.forEach(file => {
            const sourcePath = path.join(sourceDir, file.name);
            const destPath = path.join(config.patch, file.name);

            fs.copyFile(sourcePath, destPath, err => {
                if (err) {
                    console.error(`Error copying file ${sourcePath} to ${destPath}:`, err);
                } else {
                    console.log(`Copied file ${sourcePath} to ${destPath}`);
                    copyCount++;
                    if (copyCount === files.length) {
                        if (callback) {
                            callback();
                        }
                    }
                }
            });
        });
    });
}

// Функция очистки папки курса от временных фалов
function cleanCourseFolder() {
    fs.readdir(config.patch, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${config.patch}:`, err);
            return;
        }

        let deleteCount = 0;

        files.forEach(file => {
            const filePath = path.join(config.patch, file);

            // Проверяем, является ли файл форматом xsd, dtd или xml
            if (/\.(xsd|dtd|xml|xsx)$/.test(filePath)) {
                // Если да, то удаляем файл
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                        console.log(`Deleted temp file: ${filePath}`);
                        deleteCount++;
                    }
                });
            }
        });

        console.log(`Total deleted temp files: ${deleteCount}`);
    });
}

// Создание арихива курса
function createZipArchive() {
    console.log('Creating ZIP archive...');
    const output = fs.createWriteStream(path.join('./' + config.id + '.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', function () {
        console.log(`Zip archive created: ${archive.pointer()} total bytes`);

        cleanCourseFolder();
    });

    archive.on('error', function (err) {
        console.error('Error during archiving:', err);
        throw err;
    });

    archive.pipe(output);

    // добавляем все файлы и папки из папки курса в архив
    archive.directory(config.patch, false);

    archive.finalize();
}

// Функция заполнения шаблона манифеста, полей методанных для курса
function addMetadataToManifest(manifestObj) {
    return new Promise((resolve, reject) => {
        const metadata = {
            SCORM2004: {
                schema: 'ADL SCORM',
                schemaversion: '2004 4th Edition',
                'lom:lom': [{
                    'lom:general': [{
                        'lom:description': [{
                            'lom:string': [{
                                _: config.name,
                                $: {
                                    language: 'ru-RU'
                                }
                            }]
                        }]
                    }]
                }]
            },
            SCORM12: {
                schema: 'ADL SCORM',
                schemaversion: '1.2',
            }
        };

        try {
            manifestObj.manifest.metadata.push(metadata[config.standard]);
            console.log('Metadata added to manifest');
            resolve(manifestObj);
        } catch (error) {
            console.error('Error adding metadata to manifest:', error);
            reject(error);
        }
    });
}

// Функция заполнения шаблона манифеста, полей организации для курса
function addOrganizationsToManifest(manifestObj) {
    return new Promise((resolve, reject) => {
        const organizations = {
            SCORM2004: {
                $: {
                    default: config.id
                },
                organization: [{
                    $: {
                        identifier: config.id,
                        'adlseq:objectivesGlobalToSystem': 'false'
                    },
                    title: [{
                        _: config.name
                    }],
                    item: [{
                        $: {
                            identifier: 'i1',
                            identifierref: 'r1',
                            isvisible: 'true'
                        },
                        title: [{
                            _: config.name
                        }]
                    }]
                }]
            },
            SCORM12: {
                $: {
                    default: config.id
                },
                organization: [{
                    $: {
                        identifier: config.id,
                    },
                    title: [{
                        _: config.name
                    }],
                    item: [{
                        $: {
                            identifier: 'i1',
                            identifierref: 'r1',
                        },
                        title: [{
                            _: config.name
                        }]
                    }]
                }]
            }
        };

        try {
            manifestObj.manifest.organizations.push(organizations[config.standard]);
            console.log('Organizations added to manifest');
            resolve(manifestObj);
        } catch (error) {
            console.error('Error adding organizations to manifest:', error);
            reject(error);
        }
    });
}

// Функция заполнения шаблона манифеста, полей ресурсов
function addResourcesToManifest(manifestObj) {
    return new Promise((resolve, reject) => {
        const resource = {
            SCORM2004: {
                $: {
                    identifier: 'r1',
                    type: 'webcontent',
                    'adlcp:scormType': 'sco',
                    href: 'course/index.html'
                },
                file: [],
            },
            SCORM12: {
                $: {
                    identifier: 'r1',
                    type: 'webcontent',
                    'adlcp:scormtype': 'sco',
                    href: 'course/index.html'
                },
                file: [],
            },
        };

        const addFile = (dir, parent) => {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const fileStat = fs.statSync(filePath);

                if (fileStat.isDirectory()) {
                    addFile(filePath, parent);
                } else {
                    const ext = path.extname(file).toLowerCase();

                    if (['.xml', '.xsd', '.dtd', '.xsx'].indexOf(ext) === -1) {
                        const fileObj = {
                            $: {
                                href: filePath.replace(config.patch + '\\', ''),
                            },
                        };

                        parent.file.push(fileObj);
                    }
                }
            }
        };

        try {
            addFile(config.patch, resource[config.standard]);
            manifestObj.manifest.resources.resource.push(resource[config.standard]);
            console.log('Resources added to manifest');
            resolve(manifestObj);
        } catch (error) {
            console.error('Error adding resources to manifest:', error);
            reject(error);
        }
    });
}

// Функция создания манифеста
function createManifestFile() {
    console.log('Creating manifest file...');
    const manifestPath = path.join(config.patch, 'imsmanifest.xml');

    // Добавляем метаданные
    addMetadataToManifest(imsManifestTemplate)
        .then(manifestObj => {
            return addOrganizationsToManifest(manifestObj);
        })
        .then(manifestObj => {
            return addResourcesToManifest(manifestObj);
        })
        .then(manifestObj => {
            // Преобразуем объект manifest обратно в XML
            const builder = new xml2js.Builder();
            const xml = builder.buildObject(manifestObj);

            fs.writeFile(manifestPath, xml, err => {
                if (err) {
                    console.error(`Error writing manifest file ${manifestPath}:`, err);
                } else {
                    console.log(`Created manifest file: ${manifestPath}`);
                    createZipArchive();
                }
            });
        })
        .catch(error => {
            console.error('Error creating manifest file:', error);
        });
}

console.log('Starting the process...');
copyFilesToCourse(createManifestFile);
