
//--------------------------------getElement------------------------------------

const getElement = (tagName, classNames, atributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (atributes) {
		for (const atribute in atributes) {
			element[atribute] = atributes[atribute];
		}
	}

	return element;
};

//--------------------------------createHeader------------------------------------
const createHeader = (param) => {

	const {title, header: {logo, menu, social }} = param;

	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);
	container.append(wrapper);

	if (logo) {
		const headerLogo = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип ' + title,
		});
		wrapper.append(headerLogo);
	}

	if (menu) {
		const navMenu = getElement('nav', ['menu-list']);
		const allMenu = menu.map(item => {
			menuLink = getElement('a', ['menu-link'], {
				textContent: item.title,
				href: item.link,
			});

			return menuLink;
		});

		const menuButton = getElement('button', ['menu-button']);
		menuButton.addEventListener('click', () => {
			menuButton.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});

		navMenu.append(...allMenu);
		wrapper.append(navMenu);
		container.append(menuButton);
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map( item => {
			const socialLink = getElement('a', ['social-link'], {
				href: item.link,
			});
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,				
			}));

			return socialLink;
		})
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);


	return header;
};

//--------------------------------createMain------------------------------------
const createMain = (param) => {

	const {title, main: {genre, raiting, description, trailer, slider}} = param;

	const main = getElement('main');
	const container = getElement('div', ['container']);
	const mainContent = getElement('div', ['main-content']);
	const content = getElement('div', ['content']);
	mainContent.append(content);
	container.append(mainContent);
	main.append(container);

	if (genre) {
		content.append(getElement('span', ['genre', 'animated', 'fadeInRight'], {
			textContent: genre,
		}));
	}

	if (raiting) {
		const raitingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const raitingStars = getElement('div', ['rating-stars']);
		for (let i = 0; i < 10; i++) {
			starLink = i < raiting ? 'img/star.svg' : 'img/star-o.svg';
			starAlt = i ? '' : `Рейтинг ${raiting} из 10`;			
			const star = getElement('img', ['star'], {
				src: starLink,
				alt: starAlt,
			});
			raitingStars.append(star);
		}
		const raitingNumber = getElement('div', ['rating-number'], {
			textContent: `${raiting}/10`,
		});
		raitingBlock.append(raitingStars, raitingNumber);
		content.append(raitingBlock);
	}

	if (title){
		content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
			textContent: title,
		}));
	}

	if (description) {
		content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {
			textContent: description,
		}));
	}

	if (trailer) {
		content.append(getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
			href: trailer,
			textContent: 'Смотреть трейлер',
		}));
		const movieTrailer = getElement('a', ['play', 'youtube-modal'], {
			href: trailer
		});
		movieTrailer.append(getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: 'play',
		}));
		mainContent.append(movieTrailer);
	}

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map((item) => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : '')).trim()
			});

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}
				`;

				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});

	}

	return main;
};
// --------------------------------footer------------------------------------------------------
const createFooter = (param) =>{

	const { footer: { copyright, menu } } = param;

	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	const footerContent = getElement('div', ['footer-content']);
	const left = getElement('div', ['left']);
	const right = getElement('div', ['right']);

	footer.append(container);
	container.append(footerContent);
	footerContent.append(left, right);

	if (copyright) {
		left.append(getElement('span', ['copyright'], {
			textContent: copyright,
		}));
	}

	if (menu) {
		const footerMenu = getElement('nav', ['footer-menu']);
		const footerMenuItemAll = menu.map((item) => {
			const footerMenuItem = getElement('a', ['footer-link'], {
				href: item.link ? item.link : '#',
				textContent: item.title ? item.title : '',
			}); 
			console.log('footerMenuItem: ', footerMenuItem);

			return footerMenuItem;
		});

		console.log('footerMenuItemAll: ', footerMenuItemAll);
		footerMenu.append(...footerMenuItemAll);
		console.log('footerMenu: ', footerMenu);

		right.append(footerMenu);
	}

	return footer;
};

//--------------------------------movieConstructor------------------------------------
const movieConstructor = (selector, options) => {

	document.title = options.title;
	const  app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontcolor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		let type = options.favicon.substring(index + 1);
		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});
		document.head.append(favicon);
	}

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';

	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}

	if (options.footer) {
		app.append(createFooter(options));
	}
};

//--------------------------------Parameters------------------------------------
movieConstructor('.app', {
	title: 'Ведьмак',
	fontColor: '#ffffff',
	backgroundColor: '#141218',
	subColor: '#902929',
	background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'twitter.com',
				image: 'witcher/social/twitter.svg'
			},
			{
				title: 'Instagram',
				link: 'instagram.com',
				image: 'witcher/social/instagram.svg'
			},
			{
				title: 'Facebook',
				link: 'facebook.com',
				image: 'witcher/social/facebook.svg'
			}
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			},
		]
	},
	main: {
		genre: '2019,фэнтези',
		raiting: '8',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: 'Серия №1',
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия №2',
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия №3',
			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: 'Серия №4',
			},
		]
	},
	footer: {
		copyright: '© 2020 The Witcher. All right reserved.',
		menu: [
			{
				title: 'Privacy Policy',
				link: '#',
			},
			{
				title: 'Terms of Service',
				link: '#',
			},
			{
				title: 'Legal',
			},
		]
	},
});