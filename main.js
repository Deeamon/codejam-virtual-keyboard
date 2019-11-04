class ButtonContent {
  get ruSymbol() {
    return this._ruSymbol;
  }

  get enSymbol() {
    return this._enSymbol;
  }

  get enSecondarySymbol() {
    return this._enSecondarySymbol;
  }

  get ruSecondarySymbol() {
    return this._ruSecondarySymbol;
  }

  constructor(
    enSymbol,
    ruSymbol = enSymbol,
    enSecondarySymbol = null,
    ruSecondarySymbol = null,
  ) {
    this._enSymbol = enSymbol;
    this._ruSymbol = ruSymbol;
    this._enSecondarySymbol = enSecondarySymbol;
    this._ruSecondarySymbol = ruSecondarySymbol;
  }
}

class ButtonSize {

  get type() {
    return this._type;
  }

  constructor(
    type
  ) {
    if (!(type <= 7 && type >= 1)) {
      throw new Error('type should be in range [1;7]');
    }
    this._type = type;
  }
}

class Button {
  get buttonContent() {
    return this._buttonContent;
  }

  get isSupport() {
    return this._isSupport;
  }

  get buttonSize() {
    return this._buttonSize;
  }

  constructor(
    buttonContent,
    isSupport = false,
    buttonSize = new ButtonSize(1)
  ) {
    this._buttonContent = buttonContent;
    this._isSupport = isSupport;
    this._buttonSize = buttonSize;
  }
}

class KeyboardRow {

  get buttons() {
    return this._buttons;
  }

  constructor(
    buttons
  ) {
    this._buttons = buttons;
  }
}

class Keyboard {

  get row1() {
    return this._row1;
  }

  get row2() {
    return this._row2;
  }

  get row3() {
    return this._row3;
  }

  get row4() {
    return this._row4;
  }

  get row5() {
    return this._row5;
  }

  constructor(
    row1,
    row2,
    row3,
    row4,
    row5
  ) {
    this._row1 = row1;
    this._row2 = row2;
    this._row3 = row3;
    this._row4 = row4;
    this._row5 = row5;
  }
}

class LanguageProvider {
  // set isCurrentEn(val) {
  //   return this._languageProvider = val;
  // }
  // get isCurrentEn() {
  //   return this._languageProvider;
  // }
  get isCurrentEn() {
    return true;
  }
}

class Render {
  constructor(languageProvider) {
    this._languageProvider = languageProvider;
  }

  render(keyboard) {
    this._renderTextarea();

    const keyboardContainer = document.createElement('section');
    keyboardContainer.className = 'keyboard';

    const olRef = document.createElement('ol');

    this._renderRow(keyboardContainer, keyboard.row1);
    this._renderRow(keyboardContainer, keyboard.row2);
    this._renderRow(keyboardContainer, keyboard.row3);
    this._renderRow(keyboardContainer, keyboard.row4);
    this._renderRow(keyboardContainer, keyboard.row5);

    keyboardContainer.prepend(olRef);

    document.body.append(keyboardContainer);
  }
  _renderTextarea(){
    const textareaRef =  document.createElement('textarea');
    textareaRef.className = 'textarea';
    textareaRef.cols = '60';
    textareaRef.rows = '6';

    document.body.append(textareaRef);
  }

  _renderRow(keyboardContainer, keyboardRow) {
    const liRef = document.createElement('li');
    liRef.className = 'keyboard__row';

    keyboardRow.buttons.forEach(button => {
      this._renderButton(liRef, button);
    });

    keyboardContainer.append(liRef);
  }

  _renderButton(
    buttonContainer,
    { buttonContent, isSupport, buttonSize}
  ) {
    const buttonRef = document.createElement('button');
    buttonRef.className = 'button';

    const supContentRef = document.createElement('div');
    supContentRef.className = 'button__sup-content';
    supContentRef.innerText = this._languageProvider.isCurrentEn
      ? buttonContent.enSecondarySymbol
      : buttonContent.ruSecondarySymbol;
      buttonRef.append(supContentRef);

    const contentRef = document.createElement('div');
    contentRef.className = 'button__content';
    contentRef.innerText = this._languageProvider.isCurrentEn
      ? buttonContent.enSymbol
      : buttonContent.ruSymbol;
      buttonRef.append(contentRef);

    if(isSupport) {
      buttonRef.classList.add('button--support');
    }

    const buttonTypeClass = `button--type-${buttonSize.type}`;
    buttonRef.classList.add(buttonTypeClass);

    buttonContainer.append(buttonRef);
  }

}


class App {

  get keyboard() {
    return this._keyboard;
  }

  constructor() {
    this._keyboard = new Keyboard(
      new KeyboardRow(
        [
          new Button(
            new ButtonContent(
              '`',
              'ё',
              '~'
            ),
            true
          ),
          new Button(
            new ButtonContent(
              '1',
              '1',
              '!',
              '!'
            )
          ),
          new Button(
            new ButtonContent(
              '2',
              '2',
              '@',
              '"'
            )
          ),
          new Button(
            new ButtonContent(
              '3',
              '3',
              '#',
              '№'
            )
          ),
          new Button(
            new ButtonContent(
              '4',
              '4',
              '$',
              ';'
            )
          ),
          new Button(
            new ButtonContent(
              '5',
              '5',
              '%',
              '%'
            )
          ),
          new Button(
            new ButtonContent(
              '6',
              '6',
              ':',
              '^'
            )
          ),
          new Button(
            new ButtonContent(
              '7',
              '7',
              '?',
              '&'
            )
          ),
          new Button(
            new ButtonContent(
              '8',
              '8',
              '*',
              '*'
            )
          ),
          new Button(
            new ButtonContent(
              '9',
              '9',
              '(',
              '('
            )
          ),
          new Button(
            new ButtonContent(
              'p',
              'з'
            )
          ),
          new Button(
            new ButtonContent(
              '0',
              '0',
              ')',
              ')'
            )
          ),
          new Button(
            new ButtonContent(
              '-',
              '-',
              '_',
              '_'
            )
          ),
          new Button(
            new ButtonContent(
              '=',
              '=',
              '+',
              '+'
            )
          ),
          new Button(
            new ButtonContent(
              'Backspace'
            ),
            true,
            new ButtonSize(6)
          ),
        ]
      ),
      new KeyboardRow(
        [
          new Button(
            new ButtonContent(
              'tab'
            ),
            true,
            new ButtonSize(3)
          ),
          new Button(
            new ButtonContent(
              'q',
              'й'
            )
          ),
          new Button(
            new ButtonContent(
              'w',
              'ц'
            )
          ),
          new Button(
            new ButtonContent(
              'e',
              'у'
            )
          ),
          new Button(
            new ButtonContent(
              'r',
              'к'
            )
          ),
          new Button(
            new ButtonContent(
              't',
              'е'
            )
          ),
          new Button(
            new ButtonContent(
              'y',
              'н'
            )
          ),
          new Button(
            new ButtonContent(
              'u',
              'г'
            )
          ),
          new Button(
            new ButtonContent(
              'i',
              'ш'
            )
          ),
          new Button(
            new ButtonContent(
              'o',
              'щ'
            )
          ),
          new Button(
            new ButtonContent(
              'p',
              'з'
            )
          ),
          new Button(
            new ButtonContent(
              '[',
              'х'
            )
          ),
          new Button(
            new ButtonContent(
              ']',
              'ъ'
            )
          ),
          new Button(
            new ButtonContent(
              '\\',
              '\\',
              '\/',
              '\/',
            )
          ),
          new Button(
            new ButtonContent(
              'del'
            ),
            true,
            new ButtonSize(2)
          ),
        ]
      ),
      new KeyboardRow(
        [
          new Button(
            new ButtonContent(
              'Caps Lock'
            ),
            true,
            new ButtonSize(6)
          ),
          new Button(
            new ButtonContent(
              'a',
              'ф'
            )
          ),
          new Button(
            new ButtonContent(
              's',
              'ы'
            )
          ),
          new Button(
            new ButtonContent(
              'd',
              'в'
            )
          ),
          new Button(
            new ButtonContent(
              'f',
              'а'
            )
          ),
          new Button(
            new ButtonContent(
              'g',
              'п'
            )
          ),
          new Button(
            new ButtonContent(
              'h',
              'р'
            )
          ),
          new Button(
            new ButtonContent(
              'j',
              'о'
            )
          ),
          new Button(
            new ButtonContent(
              'k',
              'л'
            )
          ),
          new Button(
            new ButtonContent(
              'l',
              'д'
            )
          ),
          new Button(
            new ButtonContent(
              ';',
              'ж'
            )
          ),
          new Button(
            new ButtonContent(
              '\'',
              'э'
            )
          ),
          new Button(
            new ButtonContent(
              'enter'
            ),
            true,
            new ButtonSize(5)
          )
        ]
      ),
      new KeyboardRow(
        [
          new Button(
            new ButtonContent(
              'Shift'
            ),
            true,
            new ButtonSize(6)
          ),
          new Button(
            new ButtonContent(
              '\\'
            )
          ),
          new Button(
            new ButtonContent(
              'z',
              'я'
            )
          ),
          new Button(
            new ButtonContent(
              'x',
              'ч'
            )
          ),
          new Button(
            new ButtonContent(
              'c',
              'с'
            )
          ),
          new Button(
            new ButtonContent(
              'v',
              'м'
            )
          ),
          new Button(
            new ButtonContent(
              'b',
              'и'
            )
          ),
          new Button(
            new ButtonContent(
              'n',
              'т'
            )
          ),
          new Button(
            new ButtonContent(
              'm',
              'ь'
            )
          ),
          new Button(
            new ButtonContent(
              '.',
              'б'
            )
          ),
          new Button(
            new ButtonContent(
              ',',
              'ю'
            )
          ),
          new Button(
            new ButtonContent(
              '\/'
            )
          ),
          new Button(
            new ButtonContent(
              '▲'
            ),
            true
          ),
          new Button(
            new ButtonContent(
              'Shift'
            ),
            true
          )
        ]
      ),
      new KeyboardRow(
        [
          new Button(
            new ButtonContent(
              'Ctrl'
            ),
            true,
            new ButtonSize(4)
          ),
          new Button(
            new ButtonContent(
              'Win'
            ),
            true
          ),
          new Button(
            new ButtonContent(
              'Alt'
            ),
            true
          ),
          new Button(
            new ButtonContent(
              ''
            ),
            true,
            new ButtonSize(7)
          ),
          new Button(
            new ButtonContent(
              'Alt'
            ),
            true,
            new ButtonSize(1)
          ),
          new Button(
            new ButtonContent(
              'Ctrl'
            ),
            true,
            new ButtonSize(4)
          ),
          new Button(
            new ButtonContent(
              '◄'
            ),
            true
          ),
          new Button(
            new ButtonContent(
              '▼'
            ),
            true
          ),
          new Button(
            new ButtonContent(
              '►'
            ),
            true
          )
        ]
      )
    );

    this._languageProvider = new LanguageProvider();
    this._render = new Render(this._languageProvider);

  }

  execute(){
    this._render.render(this._keyboard);
  }
}

const app = new App();
app.execute();

//Button animation

document.querySelector('.keyboard').addEventListener('click', function(event){
	const btn = event.target.closest('button');
	if(!btn){return};
  if(!document.querySelector('.keyboard').contains(btn)){return};
  animation(btn);
})

function animation(btn) {
  btn.classList.add('button--active'); 
  setTimeout(function(){btn.classList.remove('button--active')}, 200); 
}

// Switch Language
document.addEventListener('keydown', function(event) {
  if (event.code == 'ControlLeft' && "AltLeft") {
      const lang = new LanguageProvider();
      // lang.isCurrentEn = false;
      lang.isCurrentEn = true;
      // lang.isCurrentEn;
    alert('Отменить!')
  }
});

// const app = new App();
// app.execute();