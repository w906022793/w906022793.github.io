import{ae as o,G as c,H as i,F as n,S as s,N as e,af as t,V as l}from"./framework-146c82c7.js";const p={},r=t('<h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> GitHub Actions</h2><p>GitHub Actions 是一个持续集成和持续交付 (CI/CD) 平台，可用于自动执行构建、测试和部署管道。您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。将 GitHub Actions 命令保存为 <code>main.yml</code>，放于 <code>.github\\workflows</code> 目录下，repo 发生指定调节的改变时，Actions 会自动运行。<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p>',2),u={href:"https://github.com/marketplace?type=actions",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/sdras/awesome-actions",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,[s("如果 GitHub Actions 命令中有涉及密码等私密信息，则进入项目仓库的「setting」>「Secrets」>「Action」，添加密钥进行加密处理。比如新建密钥 PERSONAL_TOKEN，Actions 命令中使用 "),n("code",null,"${{ secrets.PERSONAL_TOKEN }}"),s(" 来指代该密钥。")],-1),h=n("h3",{id:"不同仓库间复制",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#不同仓库间复制","aria-hidden":"true"},"#"),s(" 不同仓库间复制")],-1),m={href:"http://README.md",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"clean: true",-1),_={href:"https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/settings/tokens",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Copy file
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> andstor/copycat<span class="token punctuation">-</span>action@v3
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token key atrule">personal_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.PERSONAL_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">src_path</span><span class="token punctuation">:</span> docs/README.md
    <span class="token key atrule">dst_path</span><span class="token punctuation">:</span> /
    <span class="token key atrule">dst_owner</span><span class="token punctuation">:</span> rockbenben
    <span class="token key atrule">dst_repo_name</span><span class="token punctuation">:</span> LearnData
    <span class="token key atrule">dst_branch</span><span class="token punctuation">:</span> main
    <span class="token key atrule">src_branch</span><span class="token punctuation">:</span> main
    <span class="token comment">#clean: true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="actions-失败重试" tabindex="-1"><a class="header-anchor" href="#actions-失败重试" aria-hidden="true">#</a> Actions 失败重试</h3><p>在 job 和 step 中使用 if 语句，只有满足条件时才执行具体的 job 或 step。<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 任务状态检查函数</span>
success<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 当上一步执行成功时返回 true</span>
always<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 总是返回 true</span>
cancelled<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 当 workflow 被取消时返回 true</span>
failure<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 当上一步执行失败时返回 true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>first_step 会总是执行，second_step 需要上一步 first_step 执行成功才会执行，third_step 只有上一步 second_step 执行失败才执行。当 third_step 与 second_step 命令相同时，就可以达到失败重试的效果了。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">first_job</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> My first job
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> first_step
        <span class="token key atrule">if</span><span class="token punctuation">:</span> always()

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> second_step
        <span class="token key atrule">if</span><span class="token punctuation">:</span> success()

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> third_step
        <span class="token key atrule">if</span><span class="token punctuation">:</span> failure()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="uses-版本号" tabindex="-1"><a class="header-anchor" href="#uses-版本号" aria-hidden="true">#</a> uses 版本号</h3><p><code>uses: SamKirkland/FTP-Deploy-Action@4.3.1</code>：uses 会指定此步骤运行 SamKirkland/FTP-Deploy-Action 存储库中的 4.3.1 版本。</p><p>但有时 Actions 的版本不会这么快更新，又必须使用最新版，可以将版本号改为 branch name，比如 <code>uses: SamKirkland/FTP-Deploy-Action@master</code>。</p><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2><h3 id="github-忽略指定文件" tabindex="-1"><a class="header-anchor" href="#github-忽略指定文件" aria-hidden="true">#</a> GitHub 忽略指定文件</h3><p>项目路径新建一个命名为 .gitignore 的文件，将想要忽略的文件夹和文件写入 .gitignore 文件，换行分隔。</p><p>比如要忽略 node_modules 文件夹，就直接在文件中输入 node_modules。</p><hr class="footnotes-sep">`,14),g={class:"footnotes"},y={class:"footnotes-list"},A={id:"footnote1",class:"footnote-item"},x={href:"https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions",target:"_blank",rel:"noopener noreferrer"},E=n("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1),G={id:"footnote2",class:"footnote-item"},H={href:"https://blog.csdn.net/Ber_Bai/article/details/120310024",target:"_blank",rel:"noopener noreferrer"},N=n("a",{href:"#footnote-ref2",class:"footnote-backref"},"↩︎",-1);function w(D,S){const a=l("ExternalLinkIcon");return c(),i("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[s("GitHub Actions 官方市场"),e(a)])]),n("li",null,[n("a",d,[s("Awesome Actions"),e(a)])])]),k,h,n("p",null,[s("复制文件到目的地，文档没变化则不会执行。案例为将当前仓库 main 分支下 docs 的 "),n("a",m,[s("README.md"),e(a)]),s(" 文件复制到另一个仓库 rockbenben/LearnData/ 路径下，如果目标路径存在相同文件，则将覆盖。如果让 "),b,s(" 生效，Actions 会将目标路径情况，然后执行复制。")]),n("p",null,[s("此动作需按 "),n("a",_,[s("Creating a personal access token"),e(a)]),s(" 建立 "),n("a",v,[s("个人访问令牌"),e(a)]),s("，勾选权限「repo Full control of private repositories」，然后将该 token 值其保存在项目仓库的 Action 密钥。")]),f,n("section",g,[n("ol",y,[n("li",A,[n("p",null,[n("a",x,[s("了解 GitHub Actions"),e(a)]),s(),E])]),n("li",G,[n("p",null,[n("a",H,[s("最全总结，GitHub Action 自动化部署"),e(a)]),s(),N])])])])])}const T=o(p,[["render",w],["__file","GitHub.html.vue"]]);export{T as default};
