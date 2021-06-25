## 编译器简介

编程语言是人和计算机交流的媒介，但是计算机只能理解二进制语言，编译器的工作就是把人可以理解的编程语言翻译成机器可以理解的二进制语言，即可执行文件。

编译过程可以细分为7个阶段

1. 词法分析
2. 语法分析
3. 语义分析
4. 中间代码生成
5. 机器无关的代码优化
6. 代码生成
7. 机器相关的代码优化

每个阶段都以上一个阶段的输出为输入，其中词法分析的输入是源代码，第7阶段的输出为最终的可执行文件。编译器使用符号表来存储和程序相关的信息，比如变量、函数等。符号表贯穿了编译器的所有阶段，每个阶段都会用到。实际开发时，通常会把多个阶段整合为一个阶段，并不会严格按照7个阶段来开发。

## 一个简单的集合运算语言

大部分教程都是使用计算器作为演示的例子，笔者学习的时候也是以计算器为样例的，由于计算器只涉及到数字，虽然处理起来非常简单，但是能够展示的特性太单一。所以本文设计了另一种简单但是展示面更广的集合运算语言。

就把这个语言叫做AlphaGun吧。AlphaGun中只有集合这一种变量类型，并且变量名只能是大写的英文字母，集合由小写的英文字母组成，集合内的元素不能有重复。所以最多支持26个变量名，每个集合最多26个元素。AlphaGun支持集合的并(∪）、交（∩）、求差（-）三种操作。其中”∪”、”∩”优先级相同，两者并列时使用左结合规则，两者优先级都大于”-“。AlphaGun以换行符作为语句的分隔符，每行最多一个句子。下面举个栗子：

```bash
// 使用”//“作为注释的标志
A = [a, b, c] //初始化A集合
B = [c,e,z] //初始化B集合
PRINT A  //PRINT是关键字，打印集合，一次最多打印一个集合
PRINT B
C = A ∪ B
PRINT C
D = A ∩ C
PRINT D
E = A ∪ B ∩ C ∪ D
PRINT E
```

## 词法分析

词法分析是编译器的第一阶段，词法分析器把输入的字符流（源代码）转换为token流，比如 sum=num+10;就可以被划分为5个词素：”sum”、”=“、”num”、”+“、”10”、”;“。 每个词素对应一个token。

原始的词法分析器是开发者根据词法规则从零开始编写的，这种方式开发速度慢、迭代成本和维护成本都比较高。Flex是一个开源的词法分析器生成器，开发者只需要写好词法规则，Flex就可以自动生成词法分析器，把开发者从繁琐的编码中解放出来，实现快速开发、低成本迭代和维护。

本章主要介绍Flex的使用。

## Flex的语法

下面是为AlphaGun编写的Flex规则

```js
%option noyywrap

%{
    #include <stdio.h>
%}

%%

PRINT       { printf("PRINT, '%s'\n", yytext); } 
[A-Z]       { printf("IDENTIFIER, '%s'\n", yytext); }
[a-z]       { printf("STRING, '%s'\n", yytext); }
","         { printf("COMMA, '%s'\n", yytext); }
"["         { printf("LEFT_BRACKET, '%s'\n", yytext); }
"]"         { printf("RIGHT_BRACKET, '%s'\n", yytext); }
"="         { printf("ASSIGN, '%s'\n", yytext); }
"∪"         { printf("UNION, '%s'\n", yytext); }
"∩"         { printf("INTERSECT, '%s'\n", yytext); }
"-"         { printf("SUBSTRACT, '%s'\n", yytext); }
\n          { printf("NEWLINE\n"); }
"//".*      { printf("comment: %s\n", yytext); }
[ \t]       { printf("space or tab\n"); }
.           { printf("unexpected token: (%s)\n", yytext); }

%%

int main()
{
    yylex(); 
}
```

Flex的词法规则主要由3部分组成，部分之间使用”%%“分隔

- 第一部分：由选项和声明组成。%{ %}围住的部分会被原封不动的复制到Flex生成的词法分析器代码靠近前面的地方。
- 第二部分：由一系列的匹配规则(Pattern)和动作(Action)组成，每行一个匹配规则和一个动作。匹配采用了正则表达式，动作是纯C代码编写的，放在{ }里面，可以有多行代码。动作描述了匹配到规则后执行的操作，上面的例子的动作是打印提示信息。
- 第三部分：是C语言代码，会直接被复制到生成的词法生成器代码中。一般都是main程序，是词法分析器的入口。

上面的例子中，第一部分使用了 noyywrap 选项，这个初学者可以不用关心，直接加上就好了。声明部分只有 #include ，这是为了在第二部分的动作中使用printf函数。

第二部分总共有14个规则，其中 PRINT 匹配 PRINT 关键字，[A-Z]匹配单个大写字母。”,” 匹配逗号，”∪” 匹配并操作符号，”//“.* 匹配注释, 点 . 匹配除了换行符外的任意字符。匹配时会优先匹配在前面的规则，所以如果前面的规则都没有匹配上才会匹配点.规则。动作部分除了打印匹配到的规则名称，还会打印yytext，yytext是Flex中的全局变量，保存了匹配到当前规则的文本内容。比如[A-Z]规则命中后，并不知道具体是哪个字母，这个时候就可以从yytext中获取具体的值。

第三部分是一个main函数，main调用了yylex，yylex是Flex提供的一个函数，yylex每次被调用都会去解析输入的字符流，直到找到一个token才会返回。因为上面例子的动作部分没有return，所以yylex每次匹配到一个规则后都判定没有发现token，会继续解析后续的字符流，直到发现一个token或者到达了字符流末尾。。

## 执行Flex

首先需要安装flex，如果是centos的话，直接执行 sudo yum install flex 即可。

把上面的例子保存为文件set_calc_v1.l，flex使用”.l”作为规则文件的后缀名

### 生成词法分析器

```bash
flex set_calc_v1.l
```

flex生成的代码默认文件名统一为 lex.yy.c

### 编译运行

```bash
gcc lex.yy.c -o set_calc
./set_calc
```

### 输入AlphaGun代码

```bash
A = [a, b, c]
```

### 输出为

```bash
IDENTIFIER, 'A'
space or tab
ASSIGN, '='
space or tab
LEFT_BRACKET, '['
STRING, 'a'
COMMA, ','
space or tab
STRING, 'b'
COMMA, ','
space or tab
STRING, 'c'
RIGHT_BRACKET, ']'
NEWLINE
```

可以看到生成的词法分析器按照匹配规则把输入的代码拆分成了一个小单元，并分别执行了对应的动作代码，打印了规则的名字和匹配到的文本内容。

## Flex进阶

上面的例子我们其实只做了一件事，就是匹配正则表达式，然后打印信息。实际使用时，应当在匹配后返回token作为语法分析器的输入，下面是改进后的词法规则。

```bash
%option noyywrap

%{
    #include <stdio.h>

    enum yytokentype
    {
        PRINT = 258,
        IDENTIFIER = 259,
        CHAR = 260,
        COMMA = 261,
        LEFT_BRACKET = 262,
        RIGHT_BRACKET = 263,
        ASSIGN = 264,
        UNION = 265,
        INTERSECT = 266,
        SUBSTRACT = 267,
        NEWLINE = 268
    };

    char yylval;
%}

%%

PRINT       { return PRINT; }
[A-Z]       { yylval = yytext[0]; return IDENTIFIER; }
[a-z]       { yylval = yytext[0]; return CHAR; }
","         { return COMMA; }
"["         { return LEFT_BRACKET; }
"]"         { return RIGHT_BRACKET; }
"="         { return ASSIGN; }
"∪"         { return UNION; }
"∩"         { return INTERSECT; }
"-"         { return SUBSTRACT; }
\n          { return NEWLINE; }
"//".*      { /* omit comment*/ }
[ \t]       { /*ignore white space*/ }
.           { printf("unexpected token: (%s)\n", yytext); 
              return -1; }

%%


int main()
{
    int token_type;
    while(token_type = yylex())
    {
        printf("token_type: %d", token_type);
        if(token_type == IDENTIFIER || token_type == CHAR ) 
        {
            printf(", value = %c\n", yylval);
        }else
        {
            printf("\n");
        }
    }
}
```

每个部分都有一定的变动

- 第一部分定义了枚举类型yytokentype，声明了yylval变量。这两个变量其实是从语法分析器生成工具Bison生成的代码中获得的，这里我们先自己定义一份。Bison将在下一章 [简易编译器实现（二）使用Bison创建词法分析器](https://www.huliujia.com/blog/e50b11b118cb08067469fa9c8af90aad3aa2f02e/)中介绍。
- 第二部分的动作部分，不再是打印信息，而是返回了token的类型，部分规则还给yylval设置了值，比如[A-Z]，就把匹配到的大写字母的值保存到了yylval中
- 第三部分，因为我们在规则的动作部分return了，所以如果还是只调用一次yylex的话，解析到第一个token就会返回了，不会继续后面的解析。所以这里会检查yylex的返回值，如果返回值不为0，就继续解析下一个token，直到返回值为0.返回值为0表示yylex已经读到了输入字符流的末尾。如果返回的token类型是IDENTIFIER或者CHAR，打印保存在yylval中的具体值。

把上面的词法规则保存为文件set_calc_v2.l

### 生成、编译、执行

```bash
flex set_calc_v2.l
gcc lex.yy.c -o set_calc
./set_calc
```

### 输入AlphaGo代码

```bash
A=[a, b]
```

### 输出如下

```bash
token_type: 259, value = A
token_type: 264
token_type: 262
token_type: 260, value = a
token_type: 261
token_type: 260, value = b
token_type: 261
token_type: 260, value = c
token_type: 263
token_type: 268
```

可以看到输出了token的类型，对于有值的token，打印了存储在yylval中的文本内容。