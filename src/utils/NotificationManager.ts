import {notification} from 'ant-design-vue';
import {IconType, NotificationPlacement} from "ant-design-vue/lib/notification";
import {VueNode} from "ant-design-vue/lib/_util/type";
import {CSSProperties} from "vue";

interface INotifyProps {
    description?: VueNode | (() => VueNode);
    btn?: VueNode | (() => VueNode);
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: VueNode | (() => VueNode);
    placement?: NotificationPlacement;
    style?: CSSProperties;
    prefixCls?: string;
    class?: string;
    readonly type?: IconType;
    onClick?: () => void;
    top?: string;
    bottom?: string;
    getContainer?: () => HTMLElement;
    closeIcon?: VueNode | (() => VueNode);
    appContext?: any;
}

function createNotification(type: IconType, message: string, options?: any) {
    notification[type]({
        message,
        ...options || {}
    })
}


export function useNotification() {
    return {
        showSuccess: (message: string, options?: INotifyProps) => createNotification('success', message, options),
        showError: (message: string, options?: INotifyProps) => createNotification('error', message, options),
        showInfo: (message: string, options?: INotifyProps) => createNotification('info', message, options),
    }
}