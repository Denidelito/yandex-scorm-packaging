import { defineStore } from "pinia";
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as pipwerks from 'pipwerks-scorm-api-wrapper';

export const useScormStore = defineStore('scormStore', () => {
    const isInitialized = ref(false);
    const studentName = ref('');
    const lessonStatus = ref('');
    const lessonLocation = ref('/');
    const customData = ref({});  // Поле для хранения пользовательских данных

    const route = useRoute();

    const initializeScorm = () => {
        const initialized = pipwerks.SCORM.init();

        if (initialized) {
            isInitialized.value = true;
            studentName.value = pipwerks.SCORM.get('cmi.learner_name') || '';
            lessonStatus.value = pipwerks.SCORM.get('cmi.completion_status') || '';
            lessonLocation.value = pipwerks.SCORM.get('cmi.location') || '/';

            const savedData = pipwerks.SCORM.get('cmi.suspend_data') || '{}';
            customData.value = JSON.parse(savedData);

            if (lessonStatus.value === "not attempted" || lessonStatus.value === "unknown") {
                pipwerks.SCORM.set('cmi.completion_status', 'incomplete');
            }

            window.addEventListener("beforeunload", () => {
                saveData();
                pipwerks.SCORM.quit();
            });
        } else {
            console.error("Не удалось инициализировать SCORM API.");
        }
    };

    const setLessonStatus = (status) => {
        if (isInitialized.value) {
            pipwerks.SCORM.set('cmi.completion_status', status);
            lessonStatus.value = status;
        }
    };

    const setLessonLocation = (location) => {
        if (isInitialized.value) {
            pipwerks.SCORM.set('cmi.location', location);
            lessonLocation.value = location;
        }
    };

    const saveData = () => {
        if (isInitialized.value) {
            pipwerks.SCORM.set('cmi.suspend_data', JSON.stringify(customData.value));
            pipwerks.SCORM.save();
        }
    };

    const getCustomData = (key) => {
        return customData.value[key];
    };

    const setCustomData = (key, value) => {
        customData.value[key] = value;
        saveData();
    };

    const terminateScorm = () => {
        if (isInitialized.value) {
            saveData();
            pipwerks.SCORM.quit();
            isInitialized.value = false;
        }
    };

    watch(route, (newRoute, oldRoute) => {
        setLessonLocation(newRoute.fullPath);
    });

    return {
        isInitialized,
        studentName,
        lessonStatus,
        lessonLocation,
        customData,
        initializeScorm,
        setLessonStatus,
        setLessonLocation,
        saveData,
        getCustomData,
        setCustomData,
        terminateScorm,
    };
});
