# input：输入（表单输入）元素
[yuanwen](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)





**HTML `input` 元素**用于为基于Web的表单创建交互式控件，以便接受来自用户的数据; 可以使用各种类型的输入数据和控件小部件，具体取决于设备和[user agent](https://developer.mozilla.org/en-US/docs/Glossary/User_agent)。



| [内容分类](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories) | 流动区域; 内容区域; 交互式内容（如果不是处于`hiddenhidden`状态）; 列表，可标签，可提交，可重置，与表单相关的元素。 |
| :----------------------------------------------------------- | ------------------------------------------------------------ |
| 允许的内容                                                   | 无，这是一个[空元素](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element)。 |
| 标签省略                                                     | 必须有开始标签但不必有结束标签。                             |
| 允许的祖先元素                                               | 任何元素都可以包含语句型元素。                               |
| 允许的无障碍网络应用                                         | `type=button`: `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `radio`, `switch`, `tab``type=checkbox`: `button`, `menuitemcheckbox`, `option`, `switch``type=image`: `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `radio`, `switch``type=radio`: `menuitemradio``type=color|date|datetime|datetime-local|email|file`: None`type=hidden|month|number|password|range|research`: None`type=search|submit|tel|text|url|week`: None |
| DOM 接口                                                     | [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement) |

## [types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#_types)

`input`的工作方式相当程度上取决于[`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-type)属性的值，不同的 type 值会在各自的参考页中进行介绍。如果未指定此属性，则采用的默认类型为 `text`。

可用的值包括：

| Type                                                         | 描述                                                         | 基础例子 | Spec                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :------- | :----------------------------------------------------------- |
| [button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/button) | 没有默认行为的按钮，上面显示 [value](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#value) 属性的值，默认为空。 |          |                                                              |
| [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/checkbox) | 复选框，可设为选中或未选中。                                 |          |                                                              |
| [color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/color) | 用于指定颜色的控件；在支持的浏览器中，激活时会打开取色器。   |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/date) | 输入日期的控件（年、月、日，不包括时间）。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/datetime-local) | 输入日期和时间的控件，不包括时区。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/email) | 编辑邮箱地址的区域。类似 `text` 输入，但在支持的浏览器和带有动态键盘的设备上会有确认参数和相应的键盘。 |          |                                                              |
| [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) | 让用户选择文件的控件。使用[accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#accept)属性规定控件能选择的文件类型。 |          |                                                              |
| [hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/hidden) | 不显示的控件，其值仍会提交到服务器。举个例子，右边就是一个隐形的控件。 |          |                                                              |
| [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/image) | 带图像的 `submit` 按钮。显示的图像由 `src` 属性规定。如果 [src](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#src) 缺失，[alt](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#alt) 属性就会显示。 |          |                                                              |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/month) | 输入年和月的控件，没有时区。                                 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/number) | 用于输入数字的控件。如果支持的话，会显示滚动按钮并提供缺省验证（即只能输入数字）。拥有动态键盘的设备上会显示数字键盘。 |          |                                                              |
| [password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/password) | 单行的文本区域，其值会被遮盖。如果站点不安全，会警告用户。   |          |                                                              |
| [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/radio) | 单选按钮，允许在多个拥有相同 [name](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#name) 值的选项中选中其中一个。 |          |                                                              |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/range) | 此控件用于输入不需要精确的数字。控件是一个范围组件，默认值为正中间的值。同时使用[htmlattrdefmin](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmin)  和 [htmlattrdefmax](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax)来规定值的范围。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [reset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/reset) | 此按钮将表单的所有内容重置为默认值。不推荐。                 |          |                                                              |
| [search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/search) | 用于搜索字符串的单行文字区域。输入文本中的换行会被自动去除。在支持的浏览器中可能有一个删除按钮，用于清除整个区域。拥有动态键盘的设备上的回车图标会变成搜索图标。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) | 用于提交表单的按钮。                                         |          |                                                              |
| [tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/tel) | 用于输入电话号码的控件。拥有动态键盘的设备上会显示电话数字键盘。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/text) | 默认值。单行的文本区域，输入中的换行会被自动去除。           |          |                                                              |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/time) | 用于输入时间的控件，不包括时区。                             |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/url) | 用于输入 URL 的控件。类似 `text` 输入，但有验证参数，在支持动态键盘的设备上有相应的键盘。 |          | [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/week) | 用于输入以年和周数组成的日期，不带时区。                     |          |                                                              |
| 废弃的值                                                     |                                                              |          |                                                              |
| [datetime](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/datetime) | 用于输入基于UTC时区的日期和时间（时、分、秒及秒的小数部分）。 |          |                                                              |

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#属性)

`input`元素由于拥有诸多属性而异常强大，其中前文举例说明的[`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-type)属性尤其重要。由于所有`input`元素，无论是哪种 `type` ，都基于[`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)接口，所以理论上说，它们共享一套相同的属性。但实际上大部分属性只作用于特定一组 `type`。此外，一些属性作用于`input`的方式取决于`input`的`type`属性，不同的`type`有不同的效果。

下面的表格列出了所有属性，每个属性都有简短的描述。表格后的列表更详细地描述了各个属性及它们与哪些`input` `type`相关。与大部分或者全部`input` `type`都相关的属性会讲述更多细节。一些针对特定`input` `type`的属性，或者所有`input` `type`都有，但在特定的`input` `type`上有特定表现的属性，会在相应的`type`页面中说明。这个元素包含全局属性，一些针对`input`元素有额外意义的全局属性也会特别说明。

一些额外的非标准属性会在标准属性后面列出。

### [属性各论](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#属性各论)

- **`accept`**

  如果该元素的 **type** 属性的值`是file`,则该属性表明了服务器端可接受的文件类型；否则它将被忽略。该属性的值必须为一个逗号分割的列表,包含了多个唯一的内容类型声明：以 STOP 字符 (U+002E) 开始的文件扩展名。（例如：".jpg,.png,.doc"）一个有效的 MIME 类型，但没有扩展名`audio/*` 表示音频文件 [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)`video/*` 表示视频文件 [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)`image/*` 表示图片文件 [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

- **`accesskey`** [HTML 4](https://developer.mozilla.org/zh-CN/docs/Web/HTML) only, 已废弃 [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  用户按下后可以获得此控件焦点的单个字符。这是 HTML5 全局属性。

- **`autocomplete`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  这个属性表示这个控件的值是否可被浏览器自动填充。如果**type**属性的值是hidden、checkbox、radio、file，或为按钮类型（button、submit、reset、image），则本属性被忽略。可用的值是:`off`: 用户必须手动填值，或者该页面提供了自己的自动补全方法。浏览器不对此字段自动填充。`on`: 浏览器可以根据用户先前的填表情况对此字段自动填值。`name`: 完整的姓名`honorific-prefix: `Prefix or title (e.g. "Mr.", "Ms.", "Dr.", "Mlle")`given-name `：名`additional-name``family-name`：姓`honorific-suffix`: Suffix (e.g. "Jr.", "B.Sc.", "MBASW", "II")`nickname``email``username``new-password`: 新密码（如创建帐号或更改密码时使用）`current-password``organization-title`: Job title (e.g. "Software Engineer", "Senior Vice President", "Deputy Managing Director")`organization``street-address``address-line1, address-line2, address-line3, address-level4, address-level3, address-level2, address-level1``country``country-name``postal-code``cc-name`: Full name as given on the payment instrument`cc-given-name``cc-additional-name``cc-family-name``cc-number`: Code identifying the payment instrument (e.g. the credit card number)`cc-exp:` Expiration date of the payment instrument`cc-exp-month``cc-exp-year``cc-csc`: Security code for the payment instrument `cc-type`: Type of payment instrument (e.g. Visa)`transaction-currency``transaction-amount``language`: Preferred language; Valid BCP 47 language tag`bday``bday-day``bday-month``bday-year``sex`: Gender identity (e.g. Female, Fa'afafine); Free-form text, no newlines`tel``url`: Home page or other Web page corresponding to the company, person, address, or contact information in the other fields associated with this field`photo`: Photograph, icon, or other image corresponding to the company, person, address, or contact information in the other fields associated with this field参考 [WHATWG 标准](https://html.spec.whatwg.org/multipage/forms.html#autofill) 获取更多详细内容。如果`input`元素上没有**autocomplete**属性，浏览器可使用包含该input元素的表单（`form`）或通过input的**form**属性指定的表单的**autocomplete**属性值。更多信息请参见[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)的`autocomplete`属性。与其他浏览器不同，**autocomplete** 还控制着Firefox浏览器 对 input 持久化动态禁用状态和（如果适用）跨页面加载的动态检查。持久化特性默认是开启的。设置**autocomplete**的值为**off** 可以关闭该特性**。**即使autocomplete属性通常不应用于input的type，它也可以工作。具体可以查看[bug 654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072)。

- **`autofocus`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  这个布尔属性允许您指定的表单控件在页面加载时具有焦点（自动获得焦点），除非用户将其覆盖，例如通过键入不同的控件。文档中只有一个表单元素可以具有autofocus属性，它是一个布尔值。 如果type属性设置为隐藏则不能应用（即您不能自动获得焦点的属性设置为隐藏的控件）。

- **`capture`**

  Introduced in the HTML Media Capture specification and valid for the `file` input type only, the `capture` attribute defines which media—microphone, video, or camera—should be used to capture a new file for upload with `file` upload control in supporting scenarios. See the [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) input type.

- **`checked`**

  如果该元素的**type**属性的值为radio或者checkbox,则该布尔属性的存在与否表明了该控件是否是默认选择状态。If present on a `checkbox` type, it indicates that the checkbox is checked by default (when the page loads). It does *not* indicate whether this checkbox is currently checked: if the checkbox’s state is changed, this content attribute does not reflect the change. (Only the [`HTMLInputElement`’s `checked` IDL attribute](https://wiki.developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) is updated.)**Note:** Unlike other input controls, a checkboxes and radio buttons value are only included in the submitted data if they are currently `checked`. If they are, the name and the value(s) of the checked controls are submitted.For example, if a checkbox whose `name` is `fruit` has a `value` of `cherry`, and the checkbox is checked, the form data submitted will include `fruit=cherry`. If the checkbox isn't active, it isn't listed in the form data at all. The default `value` for checkboxes and radio buttons is `on`.

- **`dirname`**

  Valid for `text` and `search` input types only, the `dirname` attribute enables the submission of the directionality of the element. When included, the form control will submit with two name/value pairs: the first being the [name](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#name) and [value](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#value), the second being the value of the `dirname` as the name with the value of `ltr` or `rtl` being set by the browser.`form action="page.html" method="post"  labelFruit: input type="text" name="fruit" dirname="fruit.dir" value="cherry"/label  input type="submit"/ /form !-- page.html?fruit=cherry&fruit.dir=ltr -- `When the form above is submitted, the input cause both the `name` / `value` pair of `fruit=cherry` and the `dirname` / direction pair of `fruit.dir=ltr` to be sent.

- **`disabled`**

  这个布尔属性表示此表单控件不可用。 特别是在禁用的控件中， `click` 事件 [将不会被分发](http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#enabling-and-disabling-form-controls) 。 并且，禁用的控件的值在提交表单时也不会被提交。如果 **type** 属性为 hidden，此属性将被忽略。

**Note:** Although not required by the specification, Firefox will by default [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of an `input` across page loads. Use the [`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-autocomplete) attribute to control this feature.

- 

- **`form`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  A string specifying the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) element with which the input is associated (that is, its **form owner**). This string's value, if present, must match the [`id`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-id) of a `form` element in the same document. If this attribute isn't specified, the `input` element is associated with the nearest containing form, if any.The `form` attribute lets you place an input anywhere in the document but have it included with a form elsewhere in the document.Note: An input can only be associated with one form.

- **`formaction`**

  Valid for the `image` and `submit` input types only. See the [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) input type for more information.

- **`formenctype`**

  Valid for the `image` and `submit` input types only. See the [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) input type for more information.

- **`formmethod`**

  Valid for the `image` and `submit` input types only. See the [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) input type for more information.

- **`formnovalidate`**

  Valid for the `image` and `submit` input types only. See the [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) input type for more information.

- **`formtarget`**

  Valid for the `image` and `submit` input types only. See the [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) input type for more information.

- **`height`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  如果**type**属性的值是image，这个属性定义了按钮图片的高度。

- **`id`**

  Global attribute valid for all elements, including all the input types, it defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking. The value is used as the value of the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label)'s `for` attribute to link the label with the form control. See the [the label element](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#the_label_element) below.

- **`inputmode`**

  Global value valid for all elements, it provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Values include none `text`, `tel`, `url`, `email`, `numeric`, `decimal`, and `search`.

- **`list`**

The values of the list attribute is the [`id`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/id) of a [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist) element located in the same document. The `datalist` provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-type) are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

```html
datalist id="colorsxx"
  option#ff0000/option
  option#ee0000/option
  option#dd0000/option
  option#cc0000/option
  option#bb0000/option
/datalist
datalist id="numbersxx"
  option0/option
  option2/option
  option4/option
  option8/option
  option16/option
  option32/option
  option64/option
/datalist
datalist id="fruitsxx"
  optioncherry/option
  optionbanana/option
  optionmango/option
  optionorange/option
  optionblueberry/option
/datalist
datalist id="urlsxx"
  optionhttps://developer.mozilla.org/option
  optionhttps://caniuse.com//option
  optionhttps://mozilla.com/option
  optionhttps://mdn.github.io/option
  optionhttps://www.youtube.com/user/firefoxchannel/option
/datalist

plabel for="textx"Text/label input type="text" list="fruitsxx" id="textx"//p
plabel for="colorx"Color/label input type="color" list="colorsxx" id="colorx"//p
plabel for="rangex"Range/label input type="range" min="0" max="64" list="numbersxx" id="rangex"//p
plabel for="numberx"Number/label input type="number" min="0" max="64" list="numbersxx" id="numberx"//p
plabel for="urlx"URL/label input type="url" list="urlsxx" id="urlx"//p
```




It is valid on `text`, `search`, `url`, `tel`, `email`, `date`, `month`, `week`, `time`, `datetime-local`, `number`, `range`, and `color`. 

Per the specifications, the `list` attribute is not supported by the `hidden`, `password`, `checkbox`, `radio`, `file`, or any of the button types.

Depending on the browser, the user may see a custom color palette suggested, tic marks along a range, or even a input that opens like a select but allows for non-listed values. Check out the [browser compatibility table](https://wiki.developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist#Browser_compatibility) for the other input types.

See the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist) element.

- **`max`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) 

  此项目的最大（数字或日期时间）值，且不得小于其最小值（**min**属性）值。

- **`maxlength`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  如果 **type** 的值是 text, email, search, password, tel, 或 url，那么这个属性指明了用户最多可以输入的字符个数（按照Unicode编码方式计数）；对于其他类型的输入框，该属性被忽略。它可以大于 **size** 属性的值。如果不指定这个属性，那么用户可以输入任意多的字符。如果指定为一个负值，那么元素表现出默认行为，即用户可以输入任意多的字符。本属性的约束规则，仅在元素的 value 属性发生变化时才会执行。译者注:ie10+

- **`min`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) 

  此项目的最小（数字或日期时间）值，且不得大于其最大值（最大属性）值。

- **`minlength`**

  Valid for `text`, `search`, `url`, `tel`, `email`, and `password`, it defines the minimum number of characters (as UTF-16 code units) the user can enter into the entry field. This must be an non-negative integer value smaller than or equal to the value specified by `maxlength`. If no `minlength` is specified, or an invalid value is specified, the input has no minimum length.The input will fail [constraint validation](https://wiki.developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) if the length of the text entered into the field is fewer than `minlength` UTF-16 code units long, preventing form submission. See [Client-side validation](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#client-side_validation) for more information.

- **`multiple`**[HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  This Boolean attribute indicates whether the user can enter more than one value.这个属性指示用户能否输入多个值。这个属性仅在**type**属性为email或file的时候生效 ; 否则被忽视.

- **`name`**

  控件的名称，与表单数据一起提交。

- **`pattern`**[HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  检查控件值的正则表达式.。pattern必须匹配整个值，而不仅仅是某些子集.。使用title属性来描述帮助用户的模式.。当类型属性的值为text, search, tel, url 或 email时，此属性适用，否则将被忽略。译者注:ie10+

- **`placeholder`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  提示用户输入框的作用。用于提示的占位符文本不能包含回车或换行。仅适用于当**type** 属性为text, search, tel, url or email时; 否则会被忽略。**Note:** 请不要用`placeholder` 属性替换 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) 元素。他们的作用不同:  [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) 属性描述表单元素的角色; 也就是说，它展示预期的信息，而`placeholder` 属性是提示用户内容的输入格式。某些情况下 `placeholder` 属性对用户不可见, 所以当没有它时也需要保证form能被理解。

- **`readonly`**

  这个布尔属性用于指明用户无法修改控件的值。[HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5) 如果控件的 **type** 属性为hidden, range, color, checkbox, radio, file 或 type时，此属性会被忽略。

- **`required`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  这个属性指定用户在提交表单之前必须为该元素填充值. 当type属性是hidden,image或者按钮类型(submit,reset,button)时不可使用. [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional) 和 [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required) CSS 伪元素的样式将可以被该字段应用作外观.

- **`selectionDirection`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  The direction in which selection occurred. This is "forward" if the selection was made from left-to-right in an LTR locale or right-to-left in an RTL locale, or "backward" if the selection was made in the opposite direction. This can be "none" if the selection direction is unknown.

- **`size`**

  控件的初始大小。以像素为单位。但当**type** 属性为text 或 password时, 它表示输入的字符的长度。从HTML5开始, 此属性仅适用于当 **type** 属性为 text, search, tel, url, email,或 password；否则会被忽略。 此外，它的值必须大于0。 如果未指定大小，则使用默认值20。 HTML5 概述 "用户代理应该确保至少大部分字符是可见的", 但是不同的字符的用不同的字体表示可能会导致宽度不同。在某些浏览器中，一串带有x的字符即使定义了到x的大小也将显示不完整。 。

- **`spellcheck`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  将此属性的值设置为`true`表示元素需要检查其拼写和语法。值`default` 表示该元素将根据默认行为进行操作，可能基于父元素自己的`spellcheck`值。值`false`表示不应该检查元素

- **`src`**

  如果**type**属性的值是image, 这个属性指定了按钮图片的路径; 否则它被忽视.

- **`step`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  使用**min**和**max** 属性来限制可以设置数字或日期时间值的增量。它可以是任意字符串或是正浮点数。如果此属性未设置为任何，则控件仅接受大于最小步长值的倍数的值。

- **`tabindex`** element-specific in [HTML 4](https://developer.mozilla.org/zh-CN/docs/Web/HTML), global in [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  元素在当前文档的Tab导航顺序中的位置。

- **`title`**

  Global attribute valid for all elements, including all input types, containing a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip. The title should NOT be used as the primary explanation of the purpose of the form control. Instead, use the [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label) element with a `for` attribute set to the form control's **`id`** attribute. See [Labels](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#labels) below.

- **`type`**

  要呈现的控件类型。有关各个类型的信息，请参阅 [Form  types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#form__types)，其中包含指向每个类型的更多信息的链接。

- **`usemap`** [HTML 4](https://developer.mozilla.org/zh-CN/docs/Web/HTML) only, 已废弃 [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  作为图像映射的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/map)元素的名称.

- **`value`**

  控件的初始值. 此属性是可选的，除非**type** 属性是`radio`或`checkbox`。注意，当重新加载页面时，如果在重新加载之前更改了值，[Gecko和IE将忽略HTML源代码中指定的值](https://bugzilla.mozilla.org/show_bug.cgi?id=46845#c186)。

- **`width`** [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

  如果**type**属性的值是image，这个属性定义了按钮图片的宽度。

- 非标准 `input` 属性
