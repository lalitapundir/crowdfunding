'user strict';

const welcomeTemplate = function (data, callback) {
    let content = `

                              
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width">
    <link href="https://fonts.googleapis.com/css2?family=Manrope&display=fallback"
        rel="stylesheet">

    <title></title>
    <style type="text/css">
        body,
        #bodyTable {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important
        }

        #bodyTable {
            font-family: 'Manrope', sans-serif !important;
            min-height: 100%;
            background: #eee;
            color: #333
        }

        body,
        table,
        td,
        p,
        a,
        li,
        blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%
        }

        table,
        td {
            mso-table-lspace: 0;
            mso-table-rspace: 0
        }

        img {
            -ms-interpolation-mode: bicubic
        }

        body {
            margin: 0;
            padding: 0;
            background: #eee
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: 0;
            text-decoration: none
        }

        table {
            border-collapse: collapse !important;
            max-width: 100% !important
        }

        img {
            border: 0 !important
        }

        h1 {
            font-family: Helvetica;
            font-size: 42px;
            font-style: normal;
            font-weight: bold;
            text-align: center;
            margin: 30px auto 0
        }

        h2 {
            font-size: 32px;
            font-style: normal;
            font-weight: bold;
            margin: 50px auto 0
        }

        h3 {
            font-size: 20px;
            font-weight: bold;
            margin: 25px 0;
            letter-spacing: normal;
            text-align: left
        }

        a h3 {
            color: #444 !important;
            text-decoration: none !important
        }

        .titleLink {
            text-decoration: none !important
        }

        .preheaderContent {
            color: #808080;
            font-size: 10px;
            line-height: 125%
        }

        .preheaderContent a:link,
        .preheaderContent a:visited,
        .preheaderContent a .yshortcuts {
            color: #606060;
            font-weight: normal;
            text-decoration: underline
        }

        #emailHeader,
        #tacoTip {
            color: #fff
        }

        #emailHeader {
            background-color: #fff
        }

        #content p {
            color: #4d4d4d;
            margin: 0px 50px 0px;
            font-size: 12px;
            line-height: 32px;
            text-align: left
        }

        #button {
            display: inline-block;
            margin: 10px auto;
            background: #fff;
            border-radius: 4px;
            font-weight: bold;
            font-size: 18px;
            padding: 15px 20px;
            cursor: pointer;
            color: #0079bf;
            margin-bottom: 25px
        }

        #socialIconWrap img {
            line-height: 35px !important;
            padding: 0 5px
        }

        .footerContent div {
            color: #707070;
            font-family: Arial;
            font-size: 12px;
            line-height: 125%;
            text-align: center;
            max-width: 100% !important
        }

        .footerContent div a:link,
        .footerContent div a:visited {
            color: #369;
            font-weight: normal;
            text-decoration: underline
        }

        .footerContent img {
            display: inline
        }

        #socialLinks img {
            margin: 0 2px
        }

        #utility {
            border-top: 1px solid #ddd
        }

        #utility div {
            text-align: center
        }

        #monkeyRewards img {
            max-width: 160px
        }

        #emailFooter {
            max-width: 100% !important
        }

        #footerTwitter a,
        #footerFacebook a {
            text-decoration: none !important;
            color: #fff !important;
            font-size: 14px
        }

        #emailButton {
            border-radius: 6px;
            background: #70b500 !important;
            margin: 0 auto 60px;
            box-shadow: 0 4px 0 #578c00
        }

        #socialLinks a {
            width: 40px
        }

        #socialLinks #blogLink {
            width: 80px !important
        }

        .sectionWrap {
            text-align: center
        }

        #header {
            color: #fff !important
        }

        /* http://meyerweb.com/eric/tools/css/reset/ 
v2.0 | 20110126
License: none (public domain)
*/

        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;

        }

        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block;
        }

        ol,
        ul {
            list-style: none;
        }

        blockquote,
        q {
            quotes: none;
        }

        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
            content: '';
            content: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
    </style>
</head>

<body>

    <table border="0" cellpadding="0" cellspacing="0" id="bodyTable"
        style="height:100%; width:100%" ; font-family: 'Manrope' , sans-serif
        !important;">
        <tbody>
            <tr>
                <td align="center" valign="top">
                    <table align="center" border="0" cellspacing="0" id="emailContainer"
                        style="width:600px">
                        <tbody>

                            <tr>
                                <td align="center" valign="top"
                                    style=" font-family: 'Manrope', sans-serif !important;">
                                    <table border="0" cellpadding="0" cellspacing="0"
                                        class="sectionWrap" id="content"
                                        style="background:#FFFFFF; border-radius:4px; box-shadow:0px 3px 0px #DDDDDD; overflow:hidden; text-align:center; width:620px">
                                        <tbody>
                                            <tr>
                                                <td id="header"
                                                    style="background-image: linear-gradient(164deg, #55d5d8 0%, #7390e0 100%);background-color:#a596c1;color:#FFFFFF!important; "
                                                    valign="top">
                                                    <a href="#"
                                                        style="pointer-events:none;">
                                                        </a>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left"
                                                    style=" font-family: 'Manrope', sans-serif !important;">




                                                    <ul
                                                        style=" list-style-type: none; padding-left: 55px;padding-right: 55px;;padding-top: 20px;   ">
                                                        <li style="padding-top: 0px;">
                                                            <span
                                                                style="line-height: 32px;color: #4d4d4d; font-size: 21px !important; font-family: 'Manrope', sans-serif !important; ">Dear
                                                                ${data.name},</span>
                                                        </li>

                                                        <li style="padding-top: 15px;">
                                                            <span
                                                                style="line-height: 32px;color: #4d4d4d; font-size: 21px !important; font-family: 'Manrope', sans-serif !important; ">Thank
                                                                you for registering with
                                                                Us.</span>
                                                        </li>

                                                        <tr>

                                                            <td align="center"
                                                                style=" font-family: 'Manrope', sans-serif !important;">
                                                                <ul
                                                                    style=" list-style-type: none; padding-left: 80px;">
                                                                    <li><span
                                                                            style="font-size:21px"><a
                                                                                href="${data.link}"
                                                                                class=""
                                                                                style="background-image: linear-gradient(164deg, #55d5d8 0%, #7390e0 100%); background-color:#55d5d8;color:#ffffff;display:inline-block;font-family:'Manrope', sans-serif !important;font-weight:500; letter-spacing: 0.4px; margin-top: 22px;  line-height:48px;text-align:center;text-decoration:none;width:300px;border-radius: 74px; -webkit-text-size-adjust:none; margin-right:69px; font-size:21px !important;border-radius:50rem ">Verify
                                                                                your email address
                                                                            </a></span>&nbsp;&nbsp;&nbsp;
                                                                    </li>
                                                                </ul>

                                                            </td>
                                                        </tr>

                                                    </ul>





                                                </td>
                                            </tr>
                                            <tr>

                                                <td>
                                                   
                                                    <p
                                                        style="color: #4d4d4d;  text-align: left; line-height: 32px; font-size: 21px !important; font-family: 'Manrope', sans-serif !important;  margin: 30px 55px 21px;">
                                                        Sincerely,<br>Crowd Team
                                                    </p>

                                                </td>
                                            </tr>

                                            
                                            <tr
                                                style="font-family:Arial,Helvetica,sans-serif">
                                                <td
                                                    style="border-width:0px;line-height:18pt;border-top-style:none;border-bottom-style:none;padding:7px 100px;font-family:Arial,Helvetica,sans-serif">
                                                </td>
                                            </tr>
                                            <td align="center" valign="top">
                                                <table align="center" border="0"
                                                    cellpadding="10" cellspacing="0"
                                                    id="emailFooter"
                                                    style="width:600px">
                                                    <tbody>
                                                        <tr>
                                                            <td class="footerContent"
                                                                valign="top">
                                                                <table border="0"
                                                                    cellpadding="10"
                                                                    cellspacing="0"
                                                                    style="width:100%">

                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>

</body>
                                `;

                                return content;
    
};
module.exports ={
    welcomeTemplate:welcomeTemplate
}