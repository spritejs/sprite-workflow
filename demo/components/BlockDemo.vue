<template>
  <div class="block-demo">
    <div class="editor" ref="editor">
      <textarea ref="textarea"></textarea>
    </div>
    <div class="preview" ref="preview">
      <div class="demo" ref="demo"></div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import Split from "split.js";
import { unescape } from "scapegoat";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/lib/codemirror.css";
import { throttle } from "../utils";

export default {
  props: {
    tip: String,
    source: String
  },

  data() {
    return {
      editor: null,
      visible: true,

      isJSON: false
    };
  },

  mounted() {
    this.initEditor();
    try {
      if ((this.isJSON = this.tip.includes("json"))) {
        eval(window.spriteWorkflow.compile(this.source));
      } else {
        eval(this.unescape(this.source));
      }
    } catch (e) {
      throw e;
    }

    this.syncCode();
    this.initSplit();
  },

  methods: {
    toggle() {
      this.visible = !this.visible;
    },

    unescape(html) {
      return unescape(html);
    },

    initSplit() {
      Split([this.$refs["editor"], this.$refs["preview"]], {
        sizes: [50, 50]
      });
    },

    initEditor() {
      this.editor = CodeMirror.fromTextArea(this.$refs["textarea"], {
        mode: "application/javascript",
        extraKeys: {
          "Ctrl-Space": "autocomplete"
        },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        lineNumbers: true,
        lineWrapping: false
      });

      this.editor.getDoc().setValue(this.unescape(this.source));
    },

    syncCode() {
      const oDemo = this.$refs["demo"];

      this.editor.on(
        "change",
        throttle(
          editor => {
            try {
              const children = oDemo.querySelectorAll("*");
              if (children) {
                children.forEach(child => oDemo.removeChild(child));
              }

              this.isJSON
                ? eval(window.spriteWorkflow.compile(editor.getValue()))
                : eval(editor.getValue());
            } catch (e) {
              throw e;
            }
          },
          200,
          { leading: true, trailing: true }
        )
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.block-demo {
  position: relative;
  border: 1px solid #ebebeb;
  height: 500px;
  margin-top: 1.2em;

  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border: 1px solid #efefef;
}

.block-demo + .block-demo {
  margin-top: 30px;
}

.block-demo >>> .CodeMirror {
  height: 100% !important;
}

.block-demo > .editor,
.block-demo > .preview {
  box-sizing: border-box;
  width: 50%;
  overflow: auto;
}
.block-demo > .preview {
  box-sizing: border-box;
  max-height: 100%;
  padding: 1rem;
}
</style>
