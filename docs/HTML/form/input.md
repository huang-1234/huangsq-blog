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

- **`autocorrect`** 

  This is a non-standard attribute supported by Safari that is used to control whether autocorrection should be enabled when the user is entering/editing the text value of the `input`. Possible attribute values are:`on`: Enable autocorrection.`off`: Disable autocorrection.[`autocorrect` documentation](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocorrect) in the Safari HTML Reference.

- **`mozactionhint`** 

  Specifies an "action hint" used to determine how to label the enter key on mobile devices with virtual keyboards. Supported values are `go`, `done`, `next`, `search`, and `send`; these automatically get mapped to the appropriate string (and are case-insensitive).

- **`autocapitalize`** 

  This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:`none`: Completely disables automatic capitalization`sentences`: Automatically capitalize the first letter of sentences.`words`: Automatically capitalize the first letter of words.`characters`: Automatically capitalize all characters.`on`: Deprecated since iOS 5.`off`: Deprecated since iOS 5.[`autocapitalize` documentation in the Safari HTML Reference](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize)

- **`incremental`** 

  This is a nonstandard attribute supported by WebKit (Safari) and Blink (Chrome) that only applies when the **type** is `search`. If the attribute is present, regardless of what its value is, the `input` fires [`search`](https://developer.mozilla.org/en-US/docs/Web/Events/search) events as the user edits the text value. The event is only fired after an implementation-defined timeout has elapsed since the most recent keystroke, and new keystrokes reset the timeout. In other words, the event firing is debounced. If the attribute is absent, the [`search`](https://developer.mozilla.org/en-US/docs/Web/Events/search) event is only fired when the user explicitly initiates a search (e.g. by pressing the Enter key while within field). [`incremental` documentation in the Safari HTML Reference](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-incremental)

- **`mozactionhint`** 

  Specifies an "action hint" used to determine how to label the enter key on mobile devices with virtual keyboards. Supported values are `go`, `done`, `next`, `search`, and `send`. These automatically get mapped to the appropriate string and are case-insensitive.

- **`results`** 

  This is a nonstandard attribute supported by Safari that only applies when the **type** is `search`. It is used to control the maximum number of entries that should be displayed in the `input`'s native dropdown list of past search queries. Its value should be a nonnegative decimal integer.

- **`webkitdirectory`** 

  This Boolean attribute indicates if the selector used when the **type** attribute is `file`has to allow for the selection of directories only.

- **`x-moz-errormessage`** 

  This Mozilla extension allows you to specify the error message to display when a field doesn't successfully validate.

## [Methods](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#methods)

The following methods are provided by the [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) interface which represents `input` elements in the DOM. Also available are those methods specified by the parent interfaces, [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element), [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node), and [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

- [`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity)

  Immediately runs the validity check on the element, triggering the document to fire the [`invalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) event at the element if the value isn't valid.

- [`reportValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity)

  Returns `true` if the element's value passes validity checks; otherwise, returns `false`.

- [`select()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select)

  Selects the entire content of the `input` element, if the element's content is selectable. For elements with no selectable text content (such as a visual color picker or calendar date input), this method does nothing.

- [`setCustomValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity)

  Sets a custom message to display if the input element's value isn't valid.

- [`setRangeText()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText)

  Sets the contents of the specified range of characters in the input element to a given string. A `selectMode` parameter is available to allow controlling how the existing content is affected.

- [`setSelectionRange()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)

  Selects the specified range of characters within a textual input element. Does nothing for inputs which aren't presented as text input fields.

- [`stepDown()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown)

  Decrements the value of a numeric input by one, by default, or by the specified number of units.

- [`stepUp()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp)

  Increments the value of a numeric input by one or by the specified number of units.

## [CSS](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#css)

Inputs, being replaced elements, have a few features not applicable to non form elements. There are CSS selectors that can specification target form controls based on their UI features, also known as UI pseudo-classes. The input element can also be targeted by type with attribute selectors. There are some properties that are especially useful as well.

### [UI pseudo-classes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#ui_pseudo-classes)

| Pseudo-class                                                 | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`:enabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled) | Any currently enabled element that can be activated (selected, clicked on, typed into, etc.) or accept focus and also has a disabled state, in which it can't be activated or accept focus. |
| [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled) | Any currently disabled element that has an enabled state, meaing it otherwise could be activated (selected, clicked on, typed into, etc.) or accept focus were it not disabled. |
| [`:read-only`](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only) | Element not editable by the user                             |
| [`:read-write`](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-write) | Element that is editable by the user.                        |
| [`:placeholder-shown`](https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown) | Element that is currently displaying [placeholder text](https://wiki.developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder), including input elements with the [placeholder](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefplaceholder) attribute present that has, as of yet, no value. |
| [`:default`](https://developer.mozilla.org/en-US/docs/Web/CSS/:default) | Form elements that are the default in a group of related elements. Matches [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) and [radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) input types that were checked on page load or render. |
| [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) | Matches [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) and [radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) input types that are currently checked (and the ([``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) in a [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) that is currently selected). |
| [`:indeterminate`](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) | [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) elements whose indeterminate property is set to true by JavaScript, [radio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) elements, when all radio buttons with the same name value in the form are unchecked, and [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) elements in an indeterminate state |
| [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid) | Form controls that can have constraint validation applied and are currently valid. |
| [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid) | Form controls that have constraint validation applied and are currently not valid. Matches a form control whose value doesn't match the constraints set on it by it's attributes, such as [required](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefrequired), [pattern](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefpattern) , [step](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefstep) and [max](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax). |
| [`:in-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/:in-range) | A non-empty input whose current value is within the range limits specified by the [min](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmin) and [max](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax) attributes and the [step](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefstep) . |
| [`:out-of-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/:out-of-range) | A non-empty input whose current value is NOT within the range limits specified by the [min](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmin) and [max](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax) attributes or does not adher to the [step](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefstep) constraint. |
| [`:placeholder-shown`](https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown) | An [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) or [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) element that is currently displaying placeholder text. |
| [`:required`](https://developer.mozilla.org/en-US/docs/Web/CSS/:required) | [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), or [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) element that has the `required` attribute set on it. Only matches elements that can be required. The attribute included on a non-requirable element will not make for a match. |
| [`:optional`](https://developer.mozilla.org/en-US/docs/Web/CSS/:optional) | [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), or [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) element that does NOT have the `required` attribute set on it. Does not match elements that can't be required. |
| [`:blank`](https://developer.mozilla.org/en-US/docs/Web/CSS/:blank) | [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) and [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) elements that currently have no value. |
| [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) | Similar to `:invalid`, but is activated on blur. Matches invalid input but only after the user interaction, such as by focusing on the control, leaving the control, or attempting to submit the form containing the invalid control. |

#### Examples

We can style a checkbox label based on whether the checkbox is checked or not. In this example, we are styling the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) and [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) of the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) that comes immediately after a checked input. We haven't applied any styles if the `input` is not checked.

```
input:checked + label {
  color: red;
  font-weight: bold;
}
```

### [Attribute selectors](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attribute_selectors)

It is possible to target different types of form controls based on their [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdeftype) using [attribute selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors). CSS attribute selectors match elements based on either just the presence of a attribute or the value of a given attribute.

```
/* matches a password input */
input[type="password"] {}

/* matches a form control whose valid values are limited to a range of values*/
input[min][max] {}

/* matches a form control with with a pattern attribute */
 input[pattern] {}
```

### [::placeholder](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#placeholder)

By default, the appearance of placeholder text is a translucent or light gray. The [`::placeholder`](https://developer.mozilla.org/en-US/docs/Web/CSS/::placeholder) pseudo-element is the input's [placeholder text](https://developer.mozilla.org/en-US/docs/Learn/Forms#the_placeholder_attribute). It can be styled with a limited subset of CSS properties.

```
::placeholder {
  color: blue;
}
```

Only the subset of CSS properties that apply to the [`::first-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line) pseudo-element can be used in a rule using `::placeholder` in its selector.

### [`appearance`](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)

The [`appearance`](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance) property enables the displaying of (almost) any element as a platform-native style based on the operating system's theme as well as the removal of any platform-native styling with the `none` value.

You could make a `div` look like a radio button with `div {appearance: radio;} `or a radio look like a checkbox with `[type="checkbox] {appearance: checkbox;}`, but don't.

Setting `appearance: none` removes platform native borders, but not functionality.

### [`caret-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color)

A property specific to text entry-related elements is the CSS [`caret-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color) property, which lets you set the color used to draw the text input caret:

#### HTML

```
label for="textInput"Note the red caret:/label
input id="textInput" class="custom" size="32"
```

#### CSS

```
input.custom {
  caret-color: red;
  font: 16px "Helvetica", "Arial", "sans-serif"
}
```

#### Result

### [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) and [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

In certain cases (typically involving non-textual inputs and specialized interfaces), the `input` element is a [replaced element](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element). When it is, the position and size of the element's size and positioning within its frame can be adjusted using the CSS [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) and [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) properties

### [Styling](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#styling)

For more information about adding color to elements in HTML, see:

- [Applying color to HTML elements using CSS](https://developer.mozilla.org/en-US/docs/Web/HTML/Applying_color).

Also see:

- [Styling HTML forms,](https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms) [advanced styling for HTML forms](https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling), and
- the[ compatibility table of CSS properties](https://developer.mozilla.org/en-US/docs/Learn/Forms/Property_compatibility_table_for_form_controls).

## [Additional Features](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#additional_features)

### [Labels](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#labels)

Labels are needed to associate assistive text with an `input`. The [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) element provides explanatory information about a form field that is *always* appropriate (aside from any layout concerns you have). It's never a bad idea to use a `label` to explain what should be entered into an `input` or [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

#### Associated labels

The semantic pairing of `input` and `label` elements is useful for assistive technologies such as screen readers. By pairing them using the `label`'s `for` attribute, you bond the label to the input in a way that lets screen readers describe inputs to users more precisely.

It does not suffice to have plain text adjacent to the `input` element,. Rather, usability and accessibility requires the inclusion of either implicit or explicit [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label):

```
!-- inaccessible --
pEnter your name: input id="name" type="text" size="30"/p

!-- implicit label --
plabelEnter your name: input id="name" type="text" size="30"/label/p

!-- explicit label --
plabel for="name"Enter your name: /labelinput id="name" type="text" size="30"/p
```

The first example is inaccessible: no relationship exists between the prompt and the `input` element.

In addition to an accessible name, the label provides a larger 'hit' area for mouse and touch screen users to click on or touch. By pairing a `label` with an `input`, clicking on either one will focus the `input`. If you use plain text to "label" your input, this won't happen. Having the prompt part of the activation area for the input is helpful for people with motor control conditions.

As web developers, it's important that we never assume that people will know all the things that we know. The diversity of people using the web—and by extension your web site—practically guarantees that some of your site's visitors will have some variation in thought processes and/or circumstances that leads them to interpret your forms very differently from you without clear and properly-presented labels.

#### Placeholders are not accessible

The `placeholder` attribute lets you specify a text that appears within the `input` element's content area itself when empty. The placeholder should never be required in order to understand your forms. It is not a label, and should not be used as a substitute, because it isn't. The placeholder is used to show an example input, not an explanation or prompt. Not only is the placeholder not accessible to screen readers, but once the user enters any text into the form control, or if the form control already has a value, there is no placeholder. Browsers with automatic page translation features may skip over attributes when translating, meaning the `placeholder` may not get translated.

Don't use the `placeholder` attribute if you can avoid it. If you need to label an `input` element, use the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) element

### [Client-side validation](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#client-side_validation)

In addition to using CSS to style inputs based on the [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid) or [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid) UI states based on the current state of each input, as noted in the [UI pseudo-classes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#ui_pseudo-classes) section above, the browser provides for client-side validation on (attempted) form submission. On form submission, if their is a form control that fails constraint validation, supporting browsers will display an error message on the first invalid form control; displaying a default message based on the error type, or a message set by you.

Some input types and other attributes place limits on what values are valid for a given input. For example, `input type="number" min="2" max="10" step="2"` means only the number 2, 4, 6, 8, or 10 are valid. Several errors could occur, including a `rangeUnderflow` error if the value is less than 2, `rangeOverflow` if greater than 10, `stepMismatch` if the value is a number between 2 and 10, but not an even integer (does not match the requirements of the `step` attribute), or `typeMismatch` if the value is not a number.

Specific attributes and their values can lead to specific error [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)

| Attribute                                                    | Relevent property                                            | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [max](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmax) | [`validityState.rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow) | Occurs when the value is greater than the maximum value as defined by the `max` attribute |
| [maxlength](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmaxlength) | [`validityState.tooLong`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong) | Occurs when the number of characters is greater than the number allowed by the `maxlength` property |
| [min](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefmin) | [`validityState.rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow) | Occurs when the value is less than the minimum value as defined by the `min` attribute |
| [minlength](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefminlength) | [`validityState.tooShort`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort) | Occurs when the number of characters is less than the number required by the `minlength` property |
| [pattern](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefpattern) | [`validityState.patternMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch) | Occurs when a pattern attribute is included with a valid regular expression and the `value` does not match it. |
| [required](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefrequired) | [`validityState.valueMissing`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing) | Occurs when the `required` attribute is present but the value is `null` or radio or checkbox is not checked. |
| [step](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdefstep) | [`validityState.stepMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch) | The value doesn't match the step increment. Increment default is `1`, so only integers are valid on` type="number"` is step is not included. `step="any"` will never throw this error. |
| [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#htmlattrdeftyoe) | [`validityState.typeMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch) | Occurs when the value is not of the correct type, for example a email does not contain an `@` or a url doesn't contain a protocol. |

If a form control doesn't have the required attribute, no value, or an empty string, is not invalid. Even if the above attributes are present, with the exception of `'required'`, and empty string will not lead to an error.

We can set limits on what values we accept, and supporting browsers will natively validate these form values and alert the user if there is a mistake when the form is submitted.

In addition to the errors described in the table above, the `validityState` interface contains the `badInput`, `valid`, and `customError` boolean readonly properties. The validity object includes:

- [`validityState.valueMissing`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing)
- [`validityState.typeMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch)
- [`validityState.patternMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch)
- [`validityState.tooLong`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong)
- [`validityState.tooShort`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort)
- [`validityState.rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow)
- [`validityState.rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow)
- [`validityState.stepMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch)
- [`validityState.badInput`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput)
- [`validityState.valid`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valid)
- [`validityState.customError`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/customError)

For each of these Boolean properties, a value of `true` indicates that the specified reason validation may have failed is true, with the exception of the `valid` property, which is `true` if the element's value obeys all constraints.

If there is an error, supporting browsers will both alert the user and prevent the form from being submitted. A word of caution: if a custom error is set to a truthy value (anything other than the empty string or `null`), the form will be be prevented from being submitted. If there is no custom error message, and none of the other properties return true, `valid` will be true, and the form can be submitted.

```
function validate(input) {
  let validityState_object = input.validity;
  if(validityState_object.valueMissing) {
     input.setCustomValidity('A value is required');
  } else if (input.rangeUnderflow) {
    input.setCustomValidity('Your value is too low');
  } else if (input.rangeOverflow) {
    input.setCustomValidity('Your value is too high');
  } else {
    input.setCustomValidity('');
  }
}
```

The last line, setting the custom validity message to the error string is vital. If the user makes an error, and the validity is set, it will fail to submit, even if all of the values are valid, until the message is `null`.

#### Example

If you want to present a custom error message when a field fails to validate, you need to use the [Constraint validation features](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation#constraint_validation_interfaces) available on `input` (and related) elements. Take the following form:

```
form
  label for="name"Enter username (upper and lowercase letters): /label
  input type="text" name="name" id="name" required pattern="[A-Za-z]+"
  buttonSubmit/button
/form
```

The basic HTML form validation features will cause this to produce a default error message if you try to submit the form with either no valid filled in, or a value that does not match the `pattern`.

If you wanted to instead display custom error messages, you could use JavaScript like the following:

```
const nameInput = document.querySelector('input');
const form = document.querySelector('form');

nameInput.addEventListener('input', () = {
  nameInput.setCustomValidity('');
  nameInput.checkValidity();
});

nameInput.addEventListener('invalid', () = {
  if(nameInput.value === '') {
    nameInput.setCustomValidity('Enter your username!');
  } else {
    nameInput.setCustomValidity('Usernames can only contain upper and lowercase letters. Try again!');
  }
});
```

The example renders like so:

In brief:

- We check the valid state of the input element every time its value is changed by running the `checkValidity()` method via the `input` event handler.
- If the value is invalid, an `invalid` event is raised, and the `invalid` event handler function is run. Inside this function we work out whether the value is invalid because it is empty, or because it doesn't match the pattern, using an `if()` block, and set a custom validity error message.
- As a result, if the input value is invalid when the submit button is pressed, one of the custom error messages will be shown.
- If it is valid, it will submit as you'd expect. For this to happen, the custom validity has to be cancelled, by invoking `setCustomValidity()` with an empty string value. We therefore do this every time the `input` event is raised. If you don't do this, and a custom validity was previously set, the input will register as invalid, even if it current contains a valid value on submission.

**Note:** Always validate input constraints both client side and server side. Constraint validation doesn't remove the need for validation on the *server side*. Invalid values can still be sent by older browsers or by bad actors.

**Note**: Firefox supported a proprietary error attribute — `x-moz-errormessage` — for many versions, which allowed you set custom error messages in a similar way. This has been removed as of version 66 (see [bug 1513890](https://bugzilla.mozilla.org/show_bug.cgi?id=1513890)).

### [Localization](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#localization)

The allowed inputs for certain `input` types depend on the locale. In some locales, 1,000.00 is a valid number, while in other locales the valid way to enter this number is 1.000,00.

Firefox uses the following heuristics to determine the locale to validate the user's input (at least for `type="number"`):

- Try the language specified by a `lang`/`xml:lang` attribute on the element or any of its parents.
- Try the language specified by any `Content-Language` HTTP header. Or,
- If none specified, use the browser's locale.

### [Technical summary](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#technical_summary)

| [Content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories) | [Flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#flow_content), listed, submittable, resettable, form-associated element, [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content). If the `type` is not `hidden`, then labelable element, palpable content. |
| :----------------------------------------------------------- | ------------------------------------------------------------ |
| Permitted content                                            | None, it is an [empty element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element). |
| Tag omission                                                 | Must have a start tag and must not have an end tag.          |
| Permitted parents                                            | Any element that accepts [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content). |
| Permitted ARIA roles                                         | `type=button`: `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `radio`, `switch`, `tab``type=checkbox`: `button`, `menuitemcheckbox`, `option`, `switch``type=image`: `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `radio`, `switch``type=radio`: `menuitemradio``type=color|date|datetime|datetime-local|email|file`: None`type=hidden|month|number|password|range|reset`: None`type=search|submit|tel|text|url|week`: None |
| DOM interface                                                | [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) |

## [Specifications](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#specifications)

| Specification                                                | Status          | Comment                      |
| :----------------------------------------------------------- | :-------------- | :--------------------------- |
| [HTML Living Standard The definition of '' in that specification.](https://html.spec.whatwg.org/multipage/forms.html#the-input-element) | Living Standard |                              |
| [HTML Media Capture The definition of 'capture attribute' in that specification.](https://w3c.github.io/html-media-capture/#the-capture-attribute) | Recommendation  | Adds the `capture` attribute |
| [HTML5 The definition of '' in that specification.](https://www.w3.org/TR/html52/sec-forms.html#the-input-element) | Recommendation  |                              |
| [HTML 4.01 Specification The definition of '' in that specification.](https://www.w3.org/TR/html401/interact/forms.html#h-17.4) | Recommendation  |                              |

## [Accessibility concerns](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#accessibility_concerns)

### [Labels](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#labels_2)

When including inputs, it is an accessibilty requirement to add labels along side. This is needed so those who use assistive technologies can tell what the input is for. Also, clicking or touching a label gives focus to the label's associated form control. This improves the accessibility and usability for sighted users, increases the area a user can click or touch to activate the form control. this is especially useful (and even needed) for radio buttons and checkboxes, which are tiny. For more information about labels in general see [Labels](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#labels) .

The following is an example of how to associate the `label` with an `input` element in the above style. You need to give the `input` an `id` attribute. The `label` then needs a `for` attribute whose value is the same as the input's `id`.

```
label for="peas"Do you like peas?/label
input type="checkbox" name="peas" id="peas"
```

### [Size](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#size)

Interactive elements such as form input should provide an area large enough that it is easy to activate them. This helps a variety of people, including people with motor control issues and people using non-precise forms of input such as a stylus or fingers. A minimum interactive size of 44×44 [CSS pixels](https://www.w3.org/TR/WCAG21/#dfn-css-pixels) is recommended.

- [Understanding Success Criterion 2.5.5: Target Size | W3C Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Target Size and 2.5.5 | Adrian Roselli](http://adrianroselli.com/2019/06/target-size-and-2-5-5.html)
- [Quick test: Large touch targets - The A11Y Project](https://a11yproject.com/posts/large-touch-targets/)

## [Browser compatibility

