const menus = [
  {
    text: 'Pages',
    icon: 'cil-star',
    subMenus: [
      {
        text: 'User Login',
        page: '#loginPage',
      },
      {
        text: 'Contact Me',
        href: './pages/contact.html',
      },
      {
        text: 'SBA307',
        href: './pages/sba307.html',
      },
      {
        text: 'Resume',
        href: './pages/resume.html',
      },
      {
        text: 'Contact Me',
        href: './pages/contact.html',
      },
    ],
  },
  {
    text: 'Games',
    icon: 'cil-gamepad',
    subMenus: [
      {
        text: 'Number Guess',
      },
      {
        text: 'Baccarat',
      },
      {
        text: 'Bank Craps',
      },
      {
        text: 'Age of Empires',
      },
    ],
  },
  {
    text: 'Time Schedule',
    icon: 'cil-av-timer',
    page: 'Sorry out of time to complete this.',
  },
  {
    text: 'Base',
    icon: 'cil-puzzle',
    subMenus: [
      {
        text: 'According',
      },
      {
        text: 'Collapse',
      },
      {
        text: 'Cards',
      },
      {
        text: 'Pagination',
      },
    ],
  },
  {
    text: 'Buttons',
    icon: 'cil-cursor',
    subMenus: [
      {
        text: 'Buttons',
      },
      {
        text: 'Buttons Group',
      },
      {
        text: 'Dropdowns',
      },
    ],
  },
];

const asideEl = document.getElementById('aside');
const pageEl = document.getElementById('page');
const menuFrag = document.createDocumentFragment();
const menuEl = menuFrag.appendChild(document.createElement('ul'));
menuEl.addEventListener('click', function (e) {
  // click the menu a
  if (e.target.localName === 'a') {
    // the menu has a href, use the normal borwser behaivor.
    if (e.target.hasAttribute('href')) {
      return true;
    }
    e.preventDefault();
    this.querySelectorAll('a').forEach((a) => {
      a.classList.remove('active');
    });
    // we are click on the top nav, show the sub nav
    if (e.target.classList.contains('nav-group-toggle')) {
      const parentElement = e.target.parentElement;
      if (parentElement.classList.contains('expand')) {
        parentElement.classList.remove('expand');
      } else {
        parentElement.classList.add('expand');
        const subMenuUl = e.target.nextElementSibling;
        const aEl = subMenuUl.children[0].children[0];
        // the first menu of submenu as the page to open
        showPage({
          title: aEl.textContent,
          page: aEl.getAttribute('page'),
        });
        aEl.classList.add('active');
      }
    } else {
      e.target.classList.add('active');
      const page = {
        title: e.target.textContent,
        page: e.target.getAttribute('page'),
      };
      showPage(page);
    }
  }
});
menuEl.classList.add('nav');
populateSidebar(menus, menuEl);

asideEl.appendChild(menuFrag);

function populateSidebar(menus, menuEl) {
  menus.forEach((menu) => {
    const liEl = menuEl.appendChild(document.createElement('li'));
    const aEl = liEl.appendChild(document.createElement('a'));
    aEl.appendChild(createSvg(menu.icon));
    aEl.appendChild(document.createTextNode(menu.text));
    if (menu.href) {
      aEl.setAttribute('href', menu.href);
    }
    if (menu.page) {
      aEl.setAttribute('page', menu.page);
    }
    if (menu.subMenus instanceof Array && menu.subMenus.length > 0) {
      liEl.classList.add('nav-group');
      aEl.classList.add('nav-group-toggle');
      const subMenuEl = liEl.appendChild(document.createElement('ul'));
      subMenuEl.classList.add('nav-group-items');
      menu.subMenus.forEach((subMenu) => {
        const subLiEl = subMenuEl.appendChild(document.createElement('li'));
        const subAEl = subLiEl.appendChild(document.createElement('a'));
        if (subMenu.href) {
          subAEl.setAttribute('href', subMenu.href);
        }
        if (subMenu.page) {
          subAEl.setAttribute('page', subMenu.page);
        }
        subAEl.textContent = subMenu.text;
      });
    } else {
      liEl.classList.add('nav-item');
    }
  });
  // make the first menu active
  menuEl.children[0].querySelector('a').click();
}

function createSvg(name) {
  const svgns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('width', '30px');
  svg.setAttribute('height', '30px');
  svg.classList.add('nav-icon');
  const use = document.createElementNS(svgns, 'use');
  // use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${name}`);
  use.setAttribute('href', `./styles/svg/icon.svg#${name}`);
  svg.appendChild(use);
  return svg;
}

function showPage(page) {
  const titleEl = pageEl.querySelector('h3.title');
  const app = document.getElementById('app');
  titleEl.textContent = page.title;
  if (page.page) {
    app.innerHTML = '';
    if (page.page[0] === '#') {
      // template
      const template = document.querySelector(page.page);
      if (template) {
        app.appendChild(template.content.cloneNode(true));
        return template;
      }
    }
    app.innerHTML = page.page;
  } else {
    while (app.lastChild) {
      app.removeChild(app.lastChild);
    }
  }
}
