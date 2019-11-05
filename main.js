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

  get id() {
    return this._keyCode;
  }

  get keyCode() {
    return this._keyCode;
  }

  constructor(
    buttonContent,
    keyCode,
    isSupport = false,
    buttonSize = new ButtonSize(1),
  ) {
    this._keyCode = keyCode;
    this._buttonContent = buttonContent;
    this._isSupport = isSupport;
    this._buttonSize = buttonSize;

  }

}

// class(key) =>  key.key => getbtnbycontent => render(id) => anim
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

  getButton(id) {
    return this._row1.buttons.find(button => button.id === id)
      ||
      this._row2.buttons.find(button => button.id === id)
      ||
      this._row3.buttons.find(button => button.id === id)
      ||
      this._row4.buttons.find(button => button.id === id)
      ||
      this._row5.buttons.find(button => button.id === id);
  }

  getButtonById(keyCode) {
    return this._row1.buttons.find(button => button.keyCode === keyCode)
      ||
      this._row2.buttons.find(button => button.keyCode === keyCode)
      ||
      this._row3.buttons.find(button => button.keyCode === keyCode)
      ||
      this._row4.buttons.find(button => button.keyCode === keyCode)
      ||
      this._row5.buttons.find(button => button.keyCode === keyCode);
  }
}

class LanguageProvider {
  get isCurrentEn() {
    return true;
  }
}

class Render {
  constructor(languageProvider) {
    this._languageProvider = languageProvider;
  }

  render(keyboard, callback) {
    this._renderTextarea();

    const keyboardContainer = document.createElement('section');
    keyboardContainer.className = 'keyboard';

    keyboardContainer.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      if (!btn) { return };
      this.animateButton(btn);

      callback(btn.id);
    });

    const olRef = document.createElement('ol');

    this._renderRow(keyboardContainer, keyboard.row1);
    this._renderRow(keyboardContainer, keyboard.row2);
    this._renderRow(keyboardContainer, keyboard.row3);
    this._renderRow(keyboardContainer, keyboard.row4);
    this._renderRow(keyboardContainer, keyboard.row5);

    keyboardContainer.prepend(olRef);

    document.body.append(keyboardContainer);
  }

  fillTextarea(letter) {
    if (!this._textareaRef) {
      throw new Error('render method should have been called before');
    }

    this._textareaRef.value += letter;
  }

  animateButton(btn) {
    document.querySelector(`#${btn.id}`).classList.add('button--active');
    setTimeout(function () { document.querySelector(`#${btn.id}`).classList.remove('button--active') }, 200);
    // btn.classList.add('button--active');
    // setTimeout(function () { btn.classList.remove('button--active') }, 200);
  };

  _renderTextarea() {
    const textareaRef = document.createElement('textarea');
    textareaRef.className = 'textarea';
    textareaRef.cols = '60';
    textareaRef.rows = '6';

    document.body.append(textareaRef);
    this._textareaRef = textareaRef;
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
    { buttonContent, isSupport, buttonSize, id }
  ) {
    const buttonRef = document.createElement('button');
    buttonRef.className = 'button';
    buttonRef.id = id;

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

    if (isSupport) {
      buttonRef.classList.add('button--support');
    }

    const buttonTypeClass = `button--type-${buttonSize.type}`;
    buttonRef.classList.add(buttonTypeClass);

    buttonContainer.append(buttonRef);
  }

}

class TextareaContentManager {
  constructor(languageProvider) {
    this._languageProvider = languageProvider;
  }

  provideContent({ buttonContent }) {
    return this._languageProvider.isCurrentEn
      ? buttonContent.enSymbol
      : buttonContent.ruSymbol;
  }
}

class KeyPressManager {
  constructor(keyboard) {
    this._keyboard = keyboard;
  }

  handleKeyPress(callback) {
    document.addEventListener('keydown', (event) => {
      const keyCode = event.code; 
      event.stopPropagation();
      event.preventDefault();    
      const button = this._keyboard.getButtonById(keyCode);
      callback(button);
    })
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
            'Backquote',
            true
          ),
          new Button(
            new ButtonContent(
              '1',
              '1',
              '!',
              '!'
            ),
            'Digit1'
          ),
          new Button(
            new ButtonContent(
              '2',
              '2',
              '@',
              '"'
            ),
            'Digit2'
          ),
          new Button(
            new ButtonContent(
              '3',
              '3',
              '#',
              '№'
            ),
            'Digit3'
          ),
          new Button(
            new ButtonContent(
              '4',
              '4',
              '$',
              ';'
            ),
            'Digit4'
          ),
          new Button(
            new ButtonContent(
              '5',
              '5',
              '%',
              '%'
            ),
            'Digit5'
          ),
          new Button(
            new ButtonContent(
              '6',
              '6',
              ':',
              '^'
            ),
            'Digit6'
          ),
          new Button(
            new ButtonContent(
              '7',
              '7',
              '?',
              '&'
            ),
            'Digit7'
          ),
          new Button(
            new ButtonContent(
              '8',
              '8',
              '*',
              '*'
            ),
            'Digit8'
          ),
          new Button(
            new ButtonContent(
              '9',
              '9',
              '(',
              '('
            ),
            'Digit9'
          ),
          new Button(
            new ButtonContent(
              '0',
              '0',
              ')',
              ')'
            ),
            'Digit0'
          ),
          new Button(
            new ButtonContent(
              '-',
              '-',
              '_',
              '_'
            ),
            'Minus'
          ),
          new Button(
            new ButtonContent(
              '=',
              '=',
              '+',
              '+'
            ),
            'Equal'
          ),
          new Button(
            new ButtonContent(
              'Backspace'
            ),
            'Backspace',
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
            'Tab',
            true,
            new ButtonSize(3)
          ),
          new Button(
            new ButtonContent(
              'q',
              'й'
            ),
            'KeyQ'
          ),
          new Button(
            new ButtonContent(
              'w',
              'ц'
            ),
            'KeyW'
          ),
          new Button(
            new ButtonContent(
              'e',
              'у'
            ),
            'KeyE'
          ),
          new Button(
            new ButtonContent(
              'r',
              'к'
            ),
            'KeyR'
          ),
          new Button(
            new ButtonContent(
              't',
              'е'
            ),
            'KeyT'
          ),
          new Button(
            new ButtonContent(
              'y',
              'н'
            ),
            'KeyY'
          ),
          new Button(
            new ButtonContent(
              'u',
              'г'
            ),
            'KeyU'
          ),
          new Button(
            new ButtonContent(
              'i',
              'ш'
            ),
            'KeyI'
          ),
          new Button(
            new ButtonContent(
              'o',
              'щ'
            ),
            'KeyO'
          ),
          new Button(
            new ButtonContent(
              'p',
              'з'
            ),
            'KeyP'
          ),
          new Button(
            new ButtonContent(
              '[',
              'х'
            ),
            'BracketLeft'
          ),
          new Button(
            new ButtonContent(
              ']',
              'ъ'
            ),
            'BracketRight'
          ),
          new Button(
            new ButtonContent(
              '\\',
              '\\',
              '\/',
              '\/',
            ),
            'Backslash'
          ),
          new Button(
            new ButtonContent(
              'del'
            ),
            'Delete',
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
            'CapsLock',
            true,
            new ButtonSize(6)
          ),
          new Button(
            new ButtonContent(
              'a',
              'ф'
            ),
            'KeyA'
          ),
          new Button(
            new ButtonContent(
              's',
              'ы'
            ),
            'KeyS'
          ),
          new Button(
            new ButtonContent(
              'd',
              'в'
            ),
            'KeyD'
          ),
          new Button(
            new ButtonContent(
              'f',
              'а'
            ),
            'KeyF'
          ),
          new Button(
            new ButtonContent(
              'g',
              'п'
            ),
            'KeyG'
          ),
          new Button(
            new ButtonContent(
              'h',
              'р'
            ),
            'KeyH'
          ),
          new Button(
            new ButtonContent(
              'j',
              'о'
            ),
            'KeyJ'
          ),
          new Button(
            new ButtonContent(
              'k',
              'л'
            ),
            'KeyK'
          ),
          new Button(
            new ButtonContent(
              'l',
              'д'
            ),
            'KeyL'
          ),
          new Button(
            new ButtonContent(
              ';',
              'ж'
            ),
            'Semicolon'
          ),
          new Button(
            new ButtonContent(
              '\'',
              'э'
            ),
            'Quote'
          ),
          new Button(
            new ButtonContent(
              'enter'
            ),
            'Enter',
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
            'ShiftLeft',
            true,
            new ButtonSize(6)
          ),
          new Button(
            new ButtonContent(
              '\\'
            ),
            'Backslash'
          ),
          new Button(
            new ButtonContent(
              'z',
              'я'
            ),
            'KeyZ'
          ),
          new Button(
            new ButtonContent(
              'x',
              'ч'
            ),
            'KeyX'
          ),
          new Button(
            new ButtonContent(
              'c',
              'с'
            ),
            'KeyC'
          ),
          new Button(
            new ButtonContent(
              'v',
              'м'
            ),
            'KeyV'
          ),
          new Button(
            new ButtonContent(
              'b',
              'и'
            ),
            'KeyB'
          ),
          new Button(
            new ButtonContent(
              'n',
              'т'
            ),
            'KeyN'
          ),
          new Button(
            new ButtonContent(
              'm',
              'ь'
            ),
            'KeyM'
          ),
          new Button(
            new ButtonContent(
              '.',
              'б'
            ),
            'Comma'
          ),
          new Button(
            new ButtonContent(
              ',',
              'ю'
            ),
            'Period'
          ),
          new Button(
            new ButtonContent(
              '\/'
            ),
            'Slash'
          ),
          new Button(
            new ButtonContent(
              '▲'
            ),
            'ArrowUp',
            true
          ),
          new Button(
            new ButtonContent(
              'Shift'
            ),
            'ShiftRight',
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
            'ControlLeft',
            true,
            new ButtonSize(4)
          ),
          new Button(
            new ButtonContent(
              'Win'
            ),
            'MetaLeft',
            true
          ),
          new Button(
            new ButtonContent(
              'Alt'
            ),
            'AltLeft',
            true
          ),
          new Button(
            new ButtonContent(
              ' '
            ),
            'Space',
            true,
            new ButtonSize(7)
          ),
          new Button(
            new ButtonContent(
              'Alt'
            ),
            'AltRight',
            true,
            new ButtonSize(1)
          ),
          new Button(
            new ButtonContent(
              'Ctrl'
            ),
            'ControlRight',
            true,
            new ButtonSize(4)
          ),
          new Button(
            new ButtonContent(
              '◄'
            ),
            'ArrowLeft',
            true
          ),
          new Button(
            new ButtonContent(
              '▼'
            ),
            'ArrowDown',
            true
          ),
          new Button(
            new ButtonContent(
              '►'
            ),
            'ArrowRight',
            true
          )
        ]
      )
    );

    this._languageProvider = new LanguageProvider();
    this._render = new Render(this._languageProvider);
    this._textareaContentManager = new TextareaContentManager(this._languageProvider);
    this._keyPressManager = new KeyPressManager(this._keyboard);

  }

  execute() {
    this._render.render(this._keyboard, (id) => {
      console.log(1);
      
      this._render.fillTextarea(
        this._textareaContentManager.provideContent(
          this._keyboard.getButton(id)
        )
      );
    });

    this._keyPressManager.handleKeyPress((button) => {
      console.log(2);
      
      this._render.animateButton(button);
      this._render.fillTextarea(this._textareaContentManager.provideContent(button));
    });
  }
}

const app = new App();
app.execute();


