<template>
    <div class="elem-textarea">
        <textarea class="textarea"
            :name="wwObject.content.data.config.name"
            :required="wwObject.content.data.config.required"
            :placeholder="wwLang.getText(wwObject.content.data.config.placeholder)" 
            :rows="wwObject.content.data.config.rows || 4" 
            :style="style" />
    </div>
</template>

<script>
/* wwManager:start */
import wwTextareaPopupStyle from './popup/wwTextareaPopupStyle.vue'
import wwTextareaPopupConfig from './popup/wwTextareaPopupConfig.vue'

wwLib.wwPopups.addPopup('wwTextareaPopupConfig', wwTextareaPopupConfig)
wwLib.wwPopups.addPopup('wwTextareaPopupStyle', wwTextareaPopupStyle)

wwLib.wwPopups.addStory('WWFORM_TEXTAREA_CONFIG', {
    title: {
        en: 'Textarea Configuration',
        fr: 'Configuration de la zone de texte'
    },
    type: 'wwTextareaPopupConfig',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider'
            },
            next: false
        }
    }
})

wwLib.wwPopups.addStory('WWFORM_TEXTAREA_STYLE', {
    title: {
        en: 'Textarea style',
        fr: 'Style de la zone de texte'
    },
    type: 'wwTextareaPopupStyle',
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider'
            },
            next: false
        }
    }
})

wwLib.wwPopups.addStory('WWFORM_TEXTAREA_OPTIONS', {
    title: {
        en: 'Edit textarea',
        fr: 'Editer la zone de texte'
    },
    type: 'wwPopupEditWwObject',
    buttons: null,
    storyData: {
        list: {
            TEXTAREA_CONFIG: {
                separator: {
                    en: 'Configuration',
                    fr: 'Configuration'
                },
                title: {
                    en: 'Change textarea configuration',
                    fr: 'Changer la configuration de la zone de texte'
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-config',
                shortcut: 'c',
                next: 'WWFORM_TEXTAREA_CONFIG'
            },
            TEXTAREA_STYLE: {
                separator: {
                    en: 'Style',
                    fr: 'Style'
                },
                title: {
                    en: 'Change textarea style',
                    fr: 'Changer l\'apparence de la zone de texte'
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-edit-style',
                shortcut: 's',
                next: 'WWFORM_TEXTAREA_STYLE'
            },
        }
    }
})
/* wwManager:end */

export default {
    name: "ww-form-textarea",
    props: {
        wwObjectCtrl: Object,
    },
    data() {
        return {
            wwLang: wwLib.wwLang
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        style() {
            let style = {};
            let wwObjectStyle = this.wwObject.content.data.style || {};

            style.color = wwObjectStyle.color || 'black';
            style.fontSize = `${(wwObjectStyle.fontSize || 1)}rem`;
            style.backgroundColor = wwObjectStyle.backgroundColor || '#FFFFFF';
            style.borderRadius = `${(wwObjectStyle.borderRadius || 1)}px`;
            style.borderWidth = `${(wwObjectStyle.borderWidth || 0)}px`;
            style.borderColor = wwObjectStyle.borderColor || '#000000';
            style.borderStyle = wwObjectStyle.borderStyle || 'solid';
            style.boxShadow = this.getShadow(this.wwObject.content.data.style);
            style.padding = wwObjectStyle.padding ? `${(wwObjectStyle.padding / 2)}px ${wwObjectStyle.padding}px` : '0';
            return style;
        },
    },
    methods: {
       getShadow(wwObjectStyle) {
            wwObjectStyle = wwObjectStyle || {};
            const shadow = wwObjectStyle.boxShadow || {};
            if (shadow.x || shadow.y || shadow.b || shadow.s || shadow.c) {
                return `${shadow.x}px ${shadow.y}px ${shadow.b}px ${shadow.s}px ${shadow.c}`;
            }
            return '';
        },
        /* wwManager:start */
        async options() {
            let copyObj = JSON.parse(JSON.stringify(this.wwObject)) // to clean
            copyObj.uniqueId += 1
            let options = {
                firstPage: 'WWFORM_TEXTAREA_OPTIONS',
                data: {
                    wwObject: copyObj,
                }
            }
            try {
                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);
                /*=============================================m_ÔÔ_m=============================================\
                  TEXTAREA STYLE
                \================================================================================================*/
                this.wwObject.content.data.style = this.wwObject.content.data.style || {};
                if (typeof (result.textareaStyle) != 'undefined') {
                    if (typeof (result.textareaStyle.borderColor) != 'undefined') {
                        this.wwObject.content.data.style.borderColor = result.textareaStyle.borderColor;
                    }
                    if (typeof (result.textareaStyle.borderRadius) != 'undefined') {
                        this.wwObject.content.data.style.borderRadius = result.textareaStyle.borderRadius;
                    }
                    if (typeof (result.textareaStyle.borderStyle) != 'undefined') {
                        this.wwObject.content.data.style.borderStyle = result.textareaStyle.borderStyle;
                    }
                    if (typeof (result.textareaStyle.borderWidth) != 'undefined') {
                        this.wwObject.content.data.style.borderWidth = result.textareaStyle.borderWidth;
                    }
                    if (typeof (result.textareaStyle.boxShadow) != 'undefined') {
                        this.wwObject.content.data.style.boxShadow = result.textareaStyle.boxShadow;
                    }
                    if (typeof (result.textareaStyle.color) != 'undefined') {
                        this.wwObject.content.data.style.color = result.textareaStyle.color;
                    }
                    if (typeof (result.textareaStyle.fontSize) != 'undefined') {
                        this.wwObject.content.data.style.fontSize = result.textareaStyle.fontSize;
                    }
                    if (typeof (result.textareaStyle.backgroundColor) != 'undefined') {
                        this.wwObject.content.data.style.backgroundColor = result.textareaStyle.backgroundColor;
                    }
                    if (typeof (result.textareaStyle.padding) != 'undefined') {
                        this.wwObject.content.data.style.padding = result.textareaStyle.padding;
                    }
                    this.wwObjectCtrl.update(this.wwObject)
                }
                /*=============================================m_ÔÔ_m=============================================\
                  TEXTAREA CONFIG
                \================================================================================================*/
                this.wwObject.content.data.config = this.wwObject.content.data.config || {};
                if (typeof (result.textareaConfig) != 'undefined') {
                    if (typeof (result.textareaConfig.rows) != 'undefined') {
                        this.wwObject.content.data.config.rows = result.textareaConfig.rows;
                    }
                    if (typeof (result.textareaConfig.required) != 'undefined') {
                        this.wwObject.content.data.config.required = result.textareaConfig.required;
                    }
                    if (typeof (result.textareaConfig.name) != 'undefined') {
                        this.wwObject.content.data.config.name = result.textareaConfig.name;
                    }
                    if (typeof (result.textareaConfig.placeholder) != 'undefined') {
                        this.wwObject.content.data.config.placeholder = result.textareaConfig.placeholder;
                    }
                    this.wwObjectCtrl.update(this.wwObject)
                }
            } catch (err) {
                wwLib.wwLog.error('ERROR', err)
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    created() {
        this.wwObject.content.data = this.wwObject.content.data || {}
        this.wwObject.content.data.config = this.wwObject.content.data.config || {}
        this.wwObject.content.data.style = this.wwObject.content.data.style || {}

        this.wwObjectCtrl.update(this.wwObject)
        this.$emit('ww-loaded', this);
    }
};
</script>

<style lang="scss" scoped>
.elem-textarea {
    width: 100%;
    .textarea {
        width: 100%;
        outline: none;
        resize: none;
    }
    ::placeholder {
        color: inherit;
        opacity: 0.7;
    }
}
</style>
