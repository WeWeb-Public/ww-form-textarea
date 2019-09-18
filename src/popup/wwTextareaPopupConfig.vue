<template>
    <div class="ww-popup-config">
        <div class="content">
            <div class="elem">
                <wwManagerInput class="input" color="orange" v-model="result.textareaConfig.name" label="Name"></wwManagerInput>
            </div>
             <div class="elem">
                <div class="title">{{result.textareaConfig.rows}} Rows </div>
                <wwManagerSlider class="input" :options="rowOptions" v-model="result.textareaConfig.rows" label="Rows"></wwManagerSlider>
            </div>
            <div class="elem">
               <div class="title">Required</div>
                <wwManagerRadio class="radio" v-model="result.textareaConfig.required"></wwManagerRadio>
            </div>
            <div class="elem">
                <div class="title">Placeholder</div>
                <wwManagerInput v-for="lang in langs" :key="lang" class="input" color="blue" v-model="result.textareaConfig.placeholder[lang]" :label="lang"></wwManagerInput>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwTextareaPopupStyle",
    props: {
        options: {
            type: Object,
            default() {
                return {
                }
            }
        },
    },
    data() {
        return {
            wwObject: this.options.data.wwObject,
            langs: wwLib.wwWebsiteData.getCurrentPage().langs,
            rowOptions: {
                min: 0,
                max: 20,
                digits: 0
            },
            result: {
                textareaConfig: {
                    rows: 4,
                    required: undefined,
                    placeholder: undefined
                }
            }
        };
    },
    methods: {
        init() {
            this.result.textareaConfig.rows = this.wwObject.content.data.config.rows
            this.result.textareaConfig.required = this.wwObject.content.data.config.required || false
            this.result.textareaConfig.name = this.wwObject.content.data.config.name
            this.result.textareaConfig.placeholder = this.wwObject.content.data.config.placeholder
            this.options.result = this.result
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
    }
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        padding: 20px;
        flex-wrap: wrap;
        overflow: auto;
        width: 100%;
        justify-content: center;
        .elem {
            margin: 10px 33%;
            width: 33%;
            .input {
                width: 100%;
            }
            .select {
                width: 33%;
            }
        }
        
        .title {
            color: #e02a4d;
            font-family: "Monserrat", sans-serif;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
</style>