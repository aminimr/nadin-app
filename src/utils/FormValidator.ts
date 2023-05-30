import {Rule} from "ant-design-vue/es/form/index.js";

export function formValidator(pattern: RegExp, errorMessage: string) {
    return async (_rule: Rule, value: string) => {
        if (pattern.test(value)) {
            return Promise.resolve()
        } else {
            return Promise.reject(errorMessage);
        }
    }
}