## 安装

如果你使用NPM进行包管理，可以直接使用npm命令安装

```bash
npm install sprite-workflow
```

如果你在浏览器中直接使用，可以使用CDN版本 

```html
<script src="https://unpkg.com/sprite-workflow/lib/index.js"></script>
```

模块用法：
``` javascript
import {Link,Step,Workflow} from 'sprite-workflow';

let workflow = new Workflow({…});
// 内置的Step 类型，drawType有 ['rect','circle','triangle','star','diamond','ellipse','polygon'],默认rect
let step1 = new Step({id:'1111-123',drawType:'rect',pos: [450, 110], text: '我是矩形1'});
let step2 = new Step({id:'1111-456',pos: [450, 110], text: '我是矩形2'});
// 内置的link 类型，有 ['line','polyline'],line 直线 polyline 折线默认line 
let link = new Link( { startStepId: '1111-123',drawType:'line', endStepId: '1111-456'});

workflow.append(step);
workflow.append(link);
```


浏览器中直接使用：
``` html
<script src="https://unpkg.com/sprite-workflow/lib/index.js"></script>
<script>
const { Workflow, Link, Step } = window.spriteWorkflow;

let workflow = new Workflow({…});
let step1 = new Step({id:'1111-123',drawType:'rect',pos: [450, 110], text: '我是矩形1'});
let step2 = new Step({id:'1111-456',pos: [450, 110], text: '我是矩形2'});
let link = new Link( { startStepId: '1111-123', endStepId: '1111-456'});

workflow.append(step);
workflow.append(link);
</script>
```

### 注：
```sprite-workflow```中有三个对象 ```Workflow```、```Step``` 、 ```Link``` , 其中```Workflow```为流程可视化的实例本身，相当于舞台，```Step```表示步骤，```Link```为连接 ```Step```的线，其中，```Step```,```Link```都可以自定义，```Link```的startStepId，与 endStepId通过与```Step```的 id 产生关联，对step进行连线处理，具体详见后续demo。