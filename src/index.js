import wwObject from './wwObject.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            /* wwManager:start */
            cmsOptions: {
                wwObjectMenu: {
                    items: [
                        {
                            name: 'OPTIONS',
                            text: {
                                en: 'Options...',
                                fr: 'Options...'
                            },
                            icon: 'wwi wwi-edit-other',
                            main: true,
                            action: 'options'
                        }
                    ]
                }
            },
            /* wwManager:end */
            content: {
                type: name,
                data: {
                    config: {
                        name: 'message',
                        rows: 4,
                        required: true,
                        placeholder: {
                            en: 'message',
                            fr: 'message'
                        }
                    },
                    style: {
                        fontSize: 1, 
                        color: 'black',
                        backgroundColor: 'white',
                        borderRadius: 5,
                        borderWidth: 2,
                        borderColor: 'grey',
                        borderStyle: 'solid',
                        padding: 15
                    }
                }
            },
            upsales: {
                wwAnalytics: {
                    click: true
                }
            }
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}