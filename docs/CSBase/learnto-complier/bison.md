# 简易编译器实现（二）使用Bison创建语法分析器

2020年9月17日

 

| [教程](https://www.huliujia.com/categories/教程)



[简易编译器实现（一）使用Flex创建词法分析器](https://www.huliujia.com/blog/7bdf23e1aadefa13286b73c3aa4063a5836b1a37/)一文介绍了编译器的概念和七个阶段，并说明了如何使用Flex创建词法分析器。本篇文章介绍如何使用Bison创建语法分析器，并实现基本的运算能力。本文继续使用[简易编译器实现（一）使用Flex创建词法分析器](https://www.huliujia.com/blog/7bdf23e1aadefa13286b73c3aa4063a5836b1a37/)中提出的集合运算语言AlphaGun作为演示的例子。

## 语法分析

语法分析器使用词法分析器输出的token流作为输入，把token流转换成树状的中间表示，通常会转换成语法树，本文中使用的例子比较简单，所以会对结果进行直接计算。复杂的语言通常会先构建语法树，然后在语法树的基础上做一系列的处理。如果输入的token流不符合语法分析器的规定的语法，语法分析器还可以报语法错误。

和词法分析器自动生成类似，我们可以利用Bison来自动生成语法分析器，提高开发速度，降低迭代成本和维护成本。本文主要介绍Bison的使用。

## Bison的语法

Bison语法规则和Flex一样分为3个部分，第一部分是C语言声明、token声明、类型声明。由”%{“和”}%“围住的C语言部分会被直接拷贝到生成的语法分析器代码前面。第二部分是使用[BNF语法](https://en.wikipedia.org/wiki/Backus–Naur_form)编写的语法规则，为了编写方便，Bison对BNF做了一定的简化。第三部分是要执行的main函数。

下面是为集合运算语言AlphaGun编写的Bison规则，代码量比较大，可以直接翻到下面看解释

```bison
%{
    #include <stdio.h>
    #include <string.h>
    #include <stdlib.h>
    #include <stdarg.h>

    #define NAME_SIZE 100
    #define CHAR_SET_SIZE 26

    extern int yylineno; /* from lexer */
    int yylex();
    void yyerror(char *s, ...)
    {
        va_list ap;
        va_start(ap, s);

        fprintf(stderr, "%d: error: ", yylineno);
        vfprintf(stderr, s, ap);
        fprintf(stderr, "\n");
    }

    struct Symbol
    {
        char name;
        char value[CHAR_SET_SIZE];
    };

    struct Symbol symbol_table[26];
    char temp_char_set[CHAR_SET_SIZE];
    char factor_char_set[CHAR_SET_SIZE];
    char expr_char_set[CHAR_SET_SIZE];

    struct Symbol* NewSymbol()
    {
        struct Symbol* symbol =  (struct Symbol*)malloc(sizeof(struct Symbol));
        symbol->name = 0;
        memset(symbol->value, 0, sizeof(symbol->value));
    }

    void PrintCharSet(char name, const char* char_set)
    {
        printf("%c: [", name);
        int need_comma = 0;
        for(int i=0; i< CHAR_SET_SIZE; i++)
        {
            if(char_set[i] != 0)
            {
                if(need_comma == 1)
                {
                    printf(",");
                }
                printf("%c", char_set[i]);
                need_comma = 1;
            }
        }
        printf("]\n");
    }

    void PrintSymbol(const struct Symbol* symbol)
    {
        PrintCharSet(symbol->name, symbol->value);
    }

    void Union(char* result_char_set, const char* char_set_1, const char* char_set_2)
    {
        memcpy(result_char_set, char_set_1, CHAR_SET_SIZE);
        for(int i=0; i<CHAR_SET_SIZE; i++)
        {
            if(char_set_2[i] != 0)
            {
                result_char_set[i] = char_set_2[i];
            }
        }
    }

    void Intersect(char* result_char_set, const char* char_set_1, const char* char_set_2)
    {
        for(int i=0;i <CHAR_SET_SIZE; i++)
        {
            if(char_set_1[i] != char_set_2[i] || char_set_1[i] == 0)
            {
                result_char_set[i] = 0;
            }else
            {
                result_char_set[i] = char_set_1[i];
            }
        }
    }

    void Substract(char* result_char_set, const char* char_set_1, const char* char_set_2)
    {
        for(int i=0;i <CHAR_SET_SIZE; i++)
        {

            if(char_set_1[i] == 0 || char_set_1[i] == char_set_2[i])
            {
                result_char_set[i] = 0;
            }else
            {
                result_char_set[i] = char_set_1[i];
            }
        }
    }
%}

%union
{
    char name;
    char element;
    char* char_set;
}

%token PRINT
%token `<name>` IDENTIFIER
%token <element> CHAR
%token COMMA
%token LEFT_BRACKET
%token RIGHT_BRACKET
%token ASSIGN
%token UNION
%token INTERSECT
%token SUBSTRACT
%token NEWLINE

%type <char_set> char_list init_list factor expr

%%

language: /* nothing */
    | language statement NEWLINE
    | language NEWLINE  /*允许空行出现*/

statement: PRINT IDENTIFIER { PrintSymbol(&symbol_table[$2 - 'A']); }
    | IDENTIFIER ASSIGN init_list { symbol_table[$1-'A'].name = $1; memcpy(symbol_table[$1-'A'].value, $3, CHAR_SET_SIZE); }
    | IDENTIFIER ASSIGN expr      { symbol_table[$1-'A'].name = $1; memcpy(symbol_table[$1-'A'].value, $3, CHAR_SET_SIZE); }

expr: factor { $$ = expr_char_set; memcpy($$, $1, CHAR_SET_SIZE); }
    | expr SUBSTRACT factor { Substract($$, $1, $3); }

factor: IDENTIFIER { $$ = factor_char_set; memcpy($$, symbol_table[$1-'A'].value, CHAR_SET_SIZE); }
    | factor UNION IDENTIFIER { Union($$, $1, symbol_table[$3-'A'].value); }
    | factor INTERSECT IDENTIFIER  { Intersect($$, $1, symbol_table[$3-'A'].value); }

init_list: LEFT_BRACKET char_list RIGHT_BRACKET  { $$ = $2; }

char_list: CHAR { $$ = temp_char_set; memset($$, 0, 26); $$[$1-'a'] = $1; }
    | char_list COMMA CHAR  { $$[$3-'a'] = $3; }

%%

int main(int argc, char ** argv)
{
    yyparse();
}
```

### Bision规则第一部分

C语言部分，包含了需要的头文件，声明了几个函数，这些函数将在BNF语法规则部分用到。实现了yyerror，使得生成的语法分析器可以打印语法错误的相关信息，另外为了避免编译错误，前置声明了yylex。

token声明部分，首先定义了yylval的union类型。这里yylval由name、element、char_set三种变量联合组成，**%token`<name>` IDENTIFIER** 声明了IDENTIFIER token类型，并且告诉Bison，IDENTIFIER使用union类型的name变量存储值，这样在BNF语法规则部分，$N就会直接指代name变量。类似的CHAR使用element变量，$N指代element。

type声明部分，声明了char_list, init_list, facotr, expr这4种非终结符使用union类型的char_set变量。如果没有这个声明的话，在BNF语法规则部分，是不能给非终结符的值变量$$赋值的。

### Bison规则第二部分

第二部分是BNF语法规则部分，BNF语法规则如果细说的话又是一篇长文，这里简单介绍一下。每个规则的最左边是非终结符，冒号右边是非终结符的推导规则，一个非终结符如果有多个推到规则，使用竖线 | 分割。每个推导规则都可以对应一个动作，由 { } 包含，使用C语言代码编写。第一个规则的非终结符也被称为起始符，最终语言的全部输入都会最终匹配到起始符这里。Bison会自动对输入的token流进行解析，对匹配到的推导规则，执行动作代码，如果没有动作代码，会继续往下匹配。Bison中的每个token和非终结符都可以有一个值变量，这个是在上面的%token和%type声明中定义的。每个推导规则中，非终结符的值保存在$$中，推导规则中出现的符号的值分别保存在$1、$2 、$3、… 中。$$、$1、$2等实际指向的就是前面提到的yylval的union类型的具体变量。比如：

```bash
init_list: LEFT_BRACKET char_list RIGHT_BRACKET
```

init_list的值变量是$$，而LEFT_BRACKET的值变量就是$1，但是显然左括号不会有值，所以这里$1实际上是无用的，char_list的值变量是$2，在动作部分我们把$2赋值给了$1，从而实现了集合的初始化动作。

### Bison规则第三部分

第三部分是main函数，直接调用了yyparse函数，yyparse是Bison生成的语法分析器入口，yyparse会不断地调用yylex获取token流去解析，和语法规则去做匹配，直到token流结束或者发现语法错误。

## 执行Bison

首先把[简易编译器实现（一）使用Flex创建词法分析器](https://www.huliujia.com/blog/7bdf23e1aadefa13286b73c3aa4063a5836b1a37/)中的Flex规则文件做一点修改，修改结果如下：

```js
%option noyywrap yylineno
%{
    #include <stdio.h>
    #include "set_calc.tab.h"
    int fileno(FILE *stream);
%}

%%

PRINT       { return PRINT; }
[A-Z]       { yylval.name = yytext[0]; return IDENTIFIER; }
[a-z]       { yylval.element = yytext[0]; return CHAR; }
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
.           { printf("unexpected token: (%s)\n", yytext); }

%%
```

删除了手动定义的枚举类型和yylva变量，包含了set_calc.tab.h头文件，这个头文件是由bison生成的，头文件中定义了枚举类型和yylval变量。为了避免编译错误，声明了fileno函数。

### 保存文件、联合Flex编译

把上面的Bison规则保存为set_calc.y，把flex规则保存为set_calc.l，编译

```bash
bison -d set_calc.y # 生成语法分析器
flex set_calc.l # 生成词法分析器
gcc -std=c99 -o set_calc set_calc.tab.c lex.yy.c # 编译生成可执行文件
```

### 编写AlphaGun语言代码，保存为test.set

```bash
A=[a,b,c,d,z]
B=[c,d,e, f ] // test comment
C=[e,f,g,h,z]
D=[x,y,z]

E = A ∪ B ∩ C - A ∩ B ∪ D

PRINT A
PRINT E
```

### 执行AlphaGun代码

```bash
./set_calc < test.set
```

### 运行结果

```bash
A: [a,b,c,d,z]
E: [e,f]
```

## 语法树

对于复杂的语言，直接根据推导规则进行计算时无法实现的，所以在动作部分中可以构建语法树，最后集中处理、计算。