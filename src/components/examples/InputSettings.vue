<template>
    <card title="Input name and placeholder ">

        <date-picker
                v-model="date"
                format="jYYYY/jMM/jDD"
                name="my_date"
                input-class="form-control form-control-lg"
                placeholder="Select a date"
        ></date-picker>
        <code class="code">{{ date }}</code>

        <template slot="code">
            <highlight-code lang="html" v-pre>
                &lt;date-picker
                    v-model="date"
                    format="jYYYY/jMM/jDD"
                    input-class="form-control form-control-lg"
                    name="my_date"
                    placeholder="Select a date"&gt;
                &lt;/date-picker&gt;
            </highlight-code>
        </template>

        <template slot="docs">
            <highlight-code :lang="'javascript'">
                // Name for input element
                "name"
                type: String
                default: Null
                example: "my_date"

                // ClassName for input element
                "input-class"
                type: String
                default: Null
                example: "form-control"

                // Placeholder for input element
                "placeholder"
                type: String
                default: Null
                example: "Select a date"
            </highlight-code>
            <div class="row">
                <div class="col-md-4">
                    <highlight-code lang="html">
                        &lt;date-picker name="mdy_date"&gt;&lt;/date-picker&gt;
                        output:
                        &lt;span class="{{ $prefix }}input-group"&gt;
                            &lt;label class="{{ $prefix }}icon-btn"&gt;...&lt;/label&gt;
                            &lt;input type="text" name="my_date" class="..."/&gt;
                        &lt;/span&gt;
                    </highlight-code>
                </div>
                <div class="col-md-4">
                    <highlight-code lang="html">
                        &lt;date-picker input-class="my-input"&gt;&lt;/date-picker&gt;
                        output:
                        &lt;span class="{{ $prefix }}input-group"&gt;
                            &lt;label class="{{ $prefix }}icon-btn"&gt;...&lt;/label&gt;
                            &lt;input type="text" class="my-input" name="..."/&gt;
                        &lt;/span&gt;
                    </highlight-code>
                </div>
                <div class="col-md-4">
                    <highlight-code lang="html">
                        &lt;date-picker placeholder="select a date"&gt;&lt;/date-picker&gt;
                        output:
                        &lt;span class="{{ $prefix }}input-group"&gt;
                            &lt;label class="{{ $prefix }}icon-btn"&gt;...&lt;/label&gt;
                            &lt;input type="text" placeholder="select a date"/&gt;
                        &lt;/span&gt;
                    </highlight-code>
                </div>
            </div>

        </template>

    </card>
</template>

<script>
    export default {
      data () {
        return {
          date: ''
        }
      }
    }
</script>