# 学术主页 · 部署与维护说明

杜卓雅个人学术主页。纯静态站，无需服务器、数据库或构建工具，上传即用。

## 文件说明

```
index.html              全部内容都在这一个文件里
assets/css/main.css     样式
assets/js/main.js       中英切换 + 侧栏高亮
assets/img/photo.jpg    照片（从简历里提取的）
assets/cv/Zhuoya-Du-CV.pdf   简历 PDF
.nojekyll               告诉 GitHub 不要额外处理，别删
```

## 一、发布到 GitHub Pages（免费、自带 https）

1. 注册 <https://github.com>，记下用户名（假设是 `zhuoyadu`）。
2. 点右上角 **+** → **New repository**。仓库名必须严格写成 `用户名.github.io`，即 `zhuoyadu.github.io`。选 **Public**，其余不用动，点 **Create repository**。
3. 在新仓库页面点 **uploading an existing file**，把 `zhuoya-du-homepage` 文件夹里的**内容**（不是文件夹本身）全部拖进去 —— `index.html` 必须在仓库根目录，不能套一层文件夹。
4. 页面底部点 **Commit changes**。
5. 等 1–2 分钟，打开 `https://zhuoyadu.github.io` 就是主页了。

`.nojekyll` 是隐藏文件，拖拽时可能被系统忽略。如果传完发现样式丢失，在仓库里点 **Add file → Create new file**，文件名填 `.nojekyll`，内容留空，提交即可。

## 二、以后怎么改内容

小改动直接在网页上做：进仓库 → 点 `index.html` → 右上角铅笔图标 → 改 → **Commit changes**。约一分钟后生效。

### 加一篇新论文

在 `index.html` 里找到 `<h3>` 英文期刊论文 下面的 `<ul class="spine">`，复制任意一条 `<li>…</li>` 粘在最前面，然后改里面的字。字段含义：

```html
<li>
  <span class="year">2026</span>              <!-- 年份 -->
  <div class="entry" data-tier="1">           <!-- 方块深浅：见下 -->
    <p class="title keep" lang="en">论文标题</p>
    <p class="authors"><span class="me">Zhuoya Du</span><span class="corr">*</span>, 合作者</p>
                                              <!-- me=你自己（加粗） corr=通讯作者星号 -->
    <p class="venue"><em class="keep" lang="en">期刊名</em>, 卷(期): 页码.</p>
    <ul class="badges">
      <li data-flag="abs">ABS 4*</li>          <!-- 金色标签 -->
      <li data-flag="top"><span lang="zh">中科院经济学 1 区 TOP</span><span lang="en">CAS Econ Tier 1 TOP</span></li>
      <li>JCR Q1 · SSCI</li>                   <!-- 普通灰标签 -->
    </ul>
    <p class="doi"><a href="https://doi.org/10.xxxx/xxxxx">doi:10.xxxx/xxxxx</a></p>
  </div>
</li>
```

`data-tier` 控制左侧方块的视觉权重，让人扫一眼就看出成果层级：`1` 实心深蓝（1 区 / TOP / ABS 4*），`2` 中蓝（2 区），`3` 空心（3 区及以下）。

### 中英双语怎么写

同一处内容写两遍，用 `lang` 标记，页面按当前语言只显示一个：

```html
<span lang="zh">中文</span><span lang="en">English</span>
```

论文标题和期刊名不需要翻译，所以加了 `keep` —— 意思是"两种语言下都照原文显示"。中文期刊的标题保持中文，英文期刊的保持英文，切到哪一种语言都一样。

### 补上 Google Scholar 等链接

ORCID 已经填好了。左栏剩下两个虚线框（Google Scholar / ResearchGate）是占位的，现在点不动。搜到自己的主页地址后，把对应那行的 `href="#"` 换成真实网址，并删掉同一行的 `data-todo="..."`，虚线就会变实线、可以点击。暂时不想要的整行 `<li>…</li>` 删掉即可。

### 研究方向关键词

左栏"研究方向"下面那四个词在 `<ul class="topics">` 里，一个 `<li>` 一个词，照着现有格式加减即可。建议控制在四到六个。

### 办公室信息

`<section id="contact">` 里办公室地址和答疑时间被注释掉了（`<!-- -->` 包着）。填好内容后把首尾的 `<!--` 和 `-->` 删掉就会显示。

### 换照片 / 更新简历

同名覆盖 `assets/img/photo.jpg` 和 `assets/cv/Zhuoya-Du-CV.pdf` 即可，不用改代码。照片建议竖版、比例接近 3:4。

### 更新页脚日期

搜 `更新于 2026 年 8 月` 和 `Updated August 2026`，两处一起改。

## 三、绑定自己的域名（可选）

买域名后（`.com` 一年几十块），在仓库 **Settings → Pages → Custom domain** 填入域名，然后到域名商后台加解析记录：

- `A` 记录 `@` → `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`（四条都加）
- `CNAME` 记录 `www` → `zhuoyadu.github.io`

解析生效后回到 Settings → Pages 勾选 **Enforce HTTPS**。原来的 `.github.io` 地址会自动跳转到新域名。

## 四、交给学院/学校官网

如果不用 GitHub、而是让网管挂到学校服务器，把整个文件夹打包发过去，说明"静态页面，index.html 是入口，保持 assets 目录结构不变"即可。

## 关于本地预览

双击 `index.html` 就能在浏览器里看效果，与线上一致。

