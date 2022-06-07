'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalTime.innerHTML = this.querySelector("[data-testimonials-time]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "推荐") {
      filterItems[i].dataset.categoryMain ? filterItems[i].classList.add("active") : filterItems[i].classList.remove("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// send mail
const sendMail = function () {
  event.preventDefault();
  let name = document.getElementById('name').value,
    email = document.getElementById('email').value,
    message = document.getElementById('message').value;

  message = `I'm ${name}, from ${email}.%0d%0a我是 ${name}, 来自 ${email}.%0d%0a%0d%0a${message}`;

  location.href = `mailto:i@imyrs.com?cc=i@imy.rs&subject=Contact via IMY.RS&body=${message}`;
}


// Tour
const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: true
  }
});

const tourOff = function () {
  localStorage.tourOff = true;
  tour.cancel();
}

const toAbout = function () {
  document.getElementById('navAbout').click();
}
const toResume = function () {
  document.getElementById('navResume').click();
  tour.next();
}
const toPortfolio = function () {
  document.getElementById('navPortfolio').click();
  tour.next();
}
const toContact = function () {
  document.getElementById('navContact').click();
  tour.next();
}
const getFliter = function () {

}

tour.addSteps([
  {
    title: '初次见面',
    text: '你好, 我是杨家源. 这是我的简历.<br/><br/>我可以作为向导陪你完成对它的探索.',
    buttons: [
      { text: '算了, 我自己看看', action: tourOff, secondary: true },
      { text: '有点意思, 继续', action: tour.next }
    ]
  }, {
    text: '好的, 让我们开始吧. 使用电脑浏览可以获得更好的展示效果.<br/><br/>对了, 在我向你介绍内容的时, 你也可以自行在高亮区域内浏览内容, 就像是逛博物馆一样.<br/><br/>当然, 你也可以随时按下 ESC 关掉我.',
    buttons: [{ text: '好的', action: tour.next }]
  }, {
    text: '首先, 导航栏在这里, 你可以通过切换栏目更多内容.<br/><br/>不过暂时别动它, 让我们保持在当前页面.',
    attachTo: { element: document.getElementById('navbar'), on: 'auto' },
    buttons: [{
      text: '没问题', action: () => {
        toAbout();
        tour.next();
      }
    }]
  }, {
    text: '这是我的基础信息, 就像是我名字下的标签一样, 网络开发和爬虫是我的拿手好戏.',
    attachTo: { element: document.getElementById('sidebar'), on: 'auto' },
    buttons: [{ text: '好的', action: tour.next }]
  }, {
    text: '这几样东西填充了我的生活.<br/><br/>额, 可能还会掺杂着 旅游, 羽毛球什么的.',
    attachTo: { element: document.getElementById('service'), on: 'auto' },
    buttons: [{ text: '下一步', action: tour.next }]
  }, {
    text: '我认为客户的评价和反馈是非常重要的<br/><br/>这也是我比较引以为傲的地方: 我拥有给客户带来高效和高质量产品的能力.',
    attachTo: { element: document.getElementById('testimonials'), on: 'auto' },
    buttons: [{ text: '继续', action: toResume }]
  }, {
    text: '这是简历页, 展示了一些奖项, 过往经历和技能清单之类的东西.这部分很简单, 我建议先点击下一步和我探索其他内容, 你可以在之后返回此处继续浏览.',
    attachTo: { element: document.getElementById('resume'), on: 'auto' },
    buttons: [{ text: '知道了', action: toPortfolio }]
  }, {
    text: '嗒哒! 欢迎光临我的作品集.<br/><br/>这里收集了不少我喜欢或者满意的项目. 额外一提, 这里的项目全程均由个人独立完成.<br/><br/>你可以在这里切换标签查看不同类别的作品.',
    attachTo: { element: document.getElementById('portfolio'), on: 'auto' },
    buttons: [{ text: '看起来不错!', action: tour.next }]
  }, {
    text: '需要我为你介绍几个作品和当中使用的技术吗?',
    buttons: [
      { text: '不用了', action: () => {
        toContact();
        tour.show(12);
      }, secondary: true },
      { text: '愿闻其详', action: tour.next }
    ]
  }, {
    text: '那就从第一个开始吧<br/><br/>Privacy is a joke 是一个支持查询隐私泄露情况的网站.<br/><br/>它清洗并整理了大量国内泄露数据, 最终包含 14 亿条有效数据.<br/><br/>支持关联搜索, 姓名搜索, 模糊搜索等多种搜索方式. 通过切片, 索引, 分表查询, 数据缓存等技术手段, 使单次模糊查询耗时降低至 200 毫秒, 重复查询耗时降低至 10 毫秒.',
    attachTo: { element: document.getElementById('project1'), on: 'auto' },
    buttons: [{ text: '继续', action: tour.next }]
  }, {
    text: '在对没有 Web 页面的内容进行抓取时, 反编译和抓包总是少不了.<br/><br/>但有些产品的反爬实在让人头疼 (尤指阿里系), 所以在实时性要求不高的情况下, 可以采用 Appium 巧妙的实现需求.<br/><br/>在该案例中, 我成功从菜鸟 App 中抓取到了批量的物流, 订单, 商品等数据.',
    attachTo: { element: document.getElementById('project2'), on: 'auto' },
    buttons: [{ text: '继续', action: tour.next }]
  }, {
    text: '这是最后一个啦!<br/><br/>这是一个整合了新浪微博, 新华社, 人民网等多个网络信息来源平台的舆论风向分析预警平台.<br/><br/>通过 爬虫 + NLP + 推送 等多服务结合, 实现了关键词, 名人明星, 特定事件等多种拦截及预警方案.',
    attachTo: { element: document.getElementById('project3'), on: 'auto' },
    buttons: [{ text: '终于结束了', action: toContact }]
  }, {
    text: '如果你有任何疑问, 或者有兴趣进一步沟通, 可以在这个页面联系我.<br/><br/>它会自动唤起你设备的邮件客户端并填充必要内容.',
    attachTo: { element: document.getElementById('contact'), on: 'auto' },
    buttons: [{ text: 'OK', action: tour.next }]
  }, {
    text: '我的任务结束啦~<br/><br/>现在, 你应该已经对我有了一定了解. 请自由的探索我的网站, 感谢你的陪伴.<br/><br/>再见.',
    attachTo: { element: document.getElementById('contact'), on: 'auto' },
    buttons: [
      {
        text: '再看一次', action: () => {
          toAbout();
          tour.show(2);
        }, secondary: true
      },
      { text: '再见!', action: tourOff }
    ]
  }
]);

// if (!localStorage.tourOff) tour.start();