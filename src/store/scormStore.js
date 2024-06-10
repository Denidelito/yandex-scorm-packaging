import { defineStore } from "pinia";
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as pipwerks from 'pipwerks-scorm-api-wrapper';

export const useScormStore = defineStore('scormStore', () => {
    const isInitialized = ref(false)
    const studentName = ref('')
    const lessonStatus = ref('')
    const lessonLocation = ref('/')

    const route = useRoute()

    const initializeScorm = () => {
        const initialized = pipwerks.SCORM.init()
        if (initialized) {
            isInitialized.value = true
            studentName.value = pipwerks.SCORM.get('cmi.learner_name') || ''
            lessonStatus.value = pipwerks.SCORM.get('cmi.completion_status') || ''
            lessonLocation.value = pipwerks.SCORM.get('cmi.location') || '/'

            if (lessonStatus.value === "not attempted" || lessonStatus.value === "unknown") {
                pipwerks.SCORM.set('cmi.completion_status', 'incomplete')
            }

            window.addEventListener("beforeunload", () => {
                pipwerks.SCORM.save()
                pipwerks.SCORM.quit()
            })
        } else {
            console.error("Не удалось инициализировать SCORM API.")
        }
    }

    const setLessonStatus = (status) => {
        if (isInitialized.value) {
            pipwerks.SCORM.set('cmi.completion_status', status)
            lessonStatus.value = status
        }
    }

    const setLessonLocation = (location) => {
        if (isInitialized.value) {
            pipwerks.SCORM.set('cmi.location', location)
            lessonLocation.value = location
        }
    }

    const saveData = () => {
        if (isInitialized.value) {
            pipwerks.SCORM.save()
        }
    }

    const terminateScorm = () => {
        if (isInitialized.value) {
            pipwerks.SCORM.quit()
            isInitialized.value = false
        }
    }

    watch(route, (newRoute, oldRoute) => {
        console.log(newRoute.fullPath)
        setLessonLocation(newRoute.fullPath);
    })

    return {
        isInitialized,
        studentName,
        lessonStatus,
        lessonLocation,
        initializeScorm,
        setLessonStatus,
        setLessonLocation,
        saveData,
        terminateScorm,
    }
});