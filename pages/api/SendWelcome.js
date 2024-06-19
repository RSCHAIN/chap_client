import nodemailer from "nodemailer";

export default function handler(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  const message2 = {
    from: email,
    to:`${req.body.email}`,
    subject: "Bienvenue sur CHAP",
    text: `${req.body.message}`,
    html: `
    <!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email de bienvenue AppChap</title>
</head>
<style>
@media screen and (min-width: 600px) {
  .center {
    margin: auto;
    width: 50%;
   
    padding: 10px;
  }
  }
  @media screen and (max-width: 600px) {
    .centered {
      margin: auto;
      width: 50%;
     
      padding: 10px;
    }
    }
  
</style>
<body >
  <div class="center centered">
    <table class="center" cellspacing="0" cellpadding="0" style="border-collapse:collapse ">
      <tbody >
        <tr >
          <td width="142" valign="top" style="width:106.2pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p style="margin-bottom:0cm; text-align:center; line-height:normal"><b><img naturalheight="0" naturalwidth="0"
                  src="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107"
                  width="127" height="116"
                  style="width: 1.325in; height: 1.2083in; cursor: pointer; min-height: auto; min-width: auto;" /></b></p>
          </td>
          <td width="318" valign="top" style="width:238.7pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p style="margin-bottom:0cm; line-height:normal"><span class="x_oypena"><span
                  style="font-size: 26pt; color: rgb(148, 204, 234) !important;"
                  data-ogsc="rgb(0, 79, 104)">CHAP</span></span></p>
            <p style="margin-bottom:0cm; line-height:normal"><span class="x_oypena"><b><span
                      >Retrouvez
                    l’Afrique</span></b></span><b></b></p>
          </td>
        </tr>
        <tr>
          <td width="460" colspan="2" valign="top"
            style="width: 344.9pt;  background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
            data-ogsb="white">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                style="font-size: 12pt; " >Bienvenue sur CHAP
                !</span><span style="font-size:12.0pt"></span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size:12.0pt">&nbsp;</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size:12.0pt; ">&nbsp;</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                style="font-size: 12pt; " >Bonjour Mr/Mme/Mlle ${req.body.email},</span><span
                style="font-size:12.0pt"></span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                style="font-size:12.0pt">&nbsp;</span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                style="font-size: 12pt; "  >Nous vous remercions de
                nous rejoindre. <b>CHAP</b> vous permet de rester connecter à l’Afrique retrouver partout dans le
                monde.</span><span style="font-size:12.0pt"></span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                style="font-size:12.0pt">&nbsp;</span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size:12.0pt">&nbsp;</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal">
              <b><i><span style="font-size: 9pt; color: rgb(255, 82, 47) !important;" data-ogsc="red">Ce mail est précédé
                    par un mail de validation, n’hésitez à consulter vos spams !</span></i></b>
            </p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                style="font-size: 9pt; color: rgb(255, 82, 47) !important;" data-ogsc="red">&nbsp;</span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size: 9pt; color: rgb(255, 82, 47) !important;" data-ogsc="red">&nbsp;</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal">
              <b>&nbsp;</b>
            </p>
          </td>
        </tr>
        <tr>
          <td width="142" valign="top" style="width:106.2pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><img
                 naturalheight="0" naturalwidth="0"
                  src="https://img.icons8.com/glyph-neue/64/google-web-search.png"
                  width="44" height="44" id="x_Image_x0020_5" alt="google-web-search"
                  style="width: 0.4583in; height: 0.4583in; cursor: pointer; min-height: auto; min-width: auto;"
                  ></b></p>
          </td>
          <td width="318" valign="top" style="width:238.7pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p style="margin:0cm; text-align:justify"><b><span
                  style="font-family:'Aptos',sans-serif">Retrouvez l’Afrique</span></b></p>
            <p style="margin:0cm"><span style="font-size:10.0pt; font-family:'Aptos',sans-serif">Retrouvez
                notre réseau de commerces Africains à proximité</span><b><span
                  style="font-family:'Aptos',sans-serif"></span></b></p>
          </td>
        </tr>
        <tr>
          <td width="142" valign="top"
            style="width: 106.2pt;background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
            data-ogsb="white">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  ><img 
                    naturalheight="0" naturalwidth="0"
                    src="https://img.icons8.com/external-vectorslab-glyph-vectorslab/53/external-Parcel-shopping-and-commerce-vectorslab-glyph-vectorslab-2.png" alt="external-Parcel-shopping-and-commerce-vectorslab-glyph-vectorslab-2"
                    style="width: 0.6416in; height: 0.6416in; cursor: pointer; min-height: auto; min-width: auto;"
                    ></span></b></p>
          </td>
          <td width="318" valign="top"
            style="width: 238.7pt; background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
           >
            <p style="margin-bottom:0cm; line-height:normal"><b><span
                  style="font-family: 'Aptos', sans-serif; "
                   >Envoyez vers l’Afrique</span></b><b><span
                  style="font-family:'Aptos',sans-serif"></span></b></p>
            <p style="margin-bottom:0cm; line-height:normal"><span
                style="font-size: 10pt; font-family:'Aptos', sans-serif; "
                 >Retrouvez un réseau de transitaires partenaire a CHAP</span></p>
          </td>
        </tr>
        <tr>
          <td width="142" valign="top" style="width:106.2pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><img
                 naturalheight="0" naturalwidth="0"
                  src="https://img.icons8.com/ios-filled/50/restaurant-table.png" alt="restaurant-table"
                  width="78" height="78" 
                  alt=""
                  style="width: 0.8166in; height: 0.8166in; cursor: pointer; min-height: auto; min-width: auto;"
                  /></b></p>
          </td>
          <td width="318" valign="top" style="width:238.7pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p style="margin-bottom:0cm"><b><span
                  style="font-family:'Aptos',sans-serif">Réservez</span></b></p>
            <p style="margin-bottom:0cm; line-height:normal"><span
                style="font-family:'Aptos',sans-serif">Réservez une table auprès des restaurants africains
                partenaires à proximité partout en France</span></p>
          </td>
        </tr>
        <tr>
          <td width="142" valign="top"
            style="width: 106.2pt;  background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
           >
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                    ><img naturalheight="0" naturalwidth="0"
                    src="https://img.icons8.com/ios/50/shopping-bag--v1.png"
                    width="58" height="58" id="x_Image_x0020_2" alt="shopping Vector Icons free download in SVG, PNG Format"
                    style="width: 0.6083in; height: 0.6083in; cursor: pointer; min-height: auto; min-width: auto;"
                    /></span></b></p>
          </td>
          <td width="318" valign="top"
            style="width: 238.7pt; background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
            data-ogsb="white">
            <p style="margin-bottom:0cm; line-height:normal"><span class="x_oypena"><b><span
                    style="font-family: 'Aptos', sans-serif; "
                     >Vos courses en ligne</span></b></span></p>
            <p style="margin-bottom:0cm; line-height:normal"><span class="x_oypena"><span
                  style="font-size: 10pt; font-family: 'Aptos', sans-serif; "
                   >Commandez de chez vous auprès des commerces partenaire en Europe ou en
                  Afrique</span></span></p>
            <p style="margin-bottom:0cm; line-height:normal"><span class="x_oypena"><span
                  style="font-size: 10pt; "  >&nbsp;</span></span></p>
            <p style="margin-bottom:0cm; line-height:normal" aria-hidden="true">&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td width="460" colspan="2" valign="top" style="width:344.9pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal">
              <b>&nbsp;</b>
            </p>
          </td>
        </tr>
        <tr>
          <td width="460" colspan="2" valign="top"
            style="width: 344.9pt; background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
            data-ogsb="white">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                  >Accédez directement à votre compte : <a
                  href="https://www.appchap.fr/Choose" target="_blank" rel="noopener noreferrer"
                  data-auth="NotApplicable" data-linkindex="0" style="color: rgb(124, 174, 189) !important;"
                  data-ogsc="">Mon compte</a></span></p>
            <p style="margin-bottom:0cm; line-height:normal" aria-hidden="true">&nbsp;</p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                 >Nous rejoindre sur les réseaux sociaux ?
                <b><a href="https://www.facebook.com/profile.php?id=61553531447602" target="_blank"
                    rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="1"
                    style="color: rgb(124, 174, 189) !important;" ><span
                      style=" text-decoration: none;"  ><img
                        naturalheight="0" naturalwidth="0"
                        src=" https://img.icons8.com/fluency/48/facebook.png"
                        border="0" width="25" height="25" 
                        style="width: 0.2583in; height: 0.2583in; min-height: auto; min-width: auto;"
                       /></span></a></b></span></p>
            <p style="margin-bottom:0cm; line-height:normal" aria-hidden="true">&nbsp;</p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><span
                >Merci pour votre confiance,</span><b></b>
            </p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal" aria-hidden="true">&nbsp;</p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                   >L'équipe CHAP</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal" aria-hidden="true">&nbsp;</p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal">
              <b>&nbsp;</b>
            </p>
          </td>
        </tr>
        <tr>
          <td width="460" colspan="2" valign="top" style="width:344.9pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size: 8pt; color: rgb(164, 164, 164) !important;" data-ogsc="rgb(116, 116, 116)">Ceci est un
                  envoie automatique, nous vous prions de ne pas répondre à ce mail. Le contenu de ce message est établi à
                  l'intention exclusive de son destinataire. Si vous recevez ce message par erreur, merci de le
                  détruire</span></b><span style="font-size: 8pt; color: rgb(164, 164, 164) !important;"
                data-ogsc="rgb(116, 116, 116)"></span></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal">
              <b>&nbsp;</b>
            </p>
          </td>
        </tr>
        <tr>
          <td width="460" colspan="2" valign="top"
            style="width: 344.9pt; background-position: 0% 0%; background-repeat: repeat; background-attachment: scroll; background-image: none; background-size: auto; background-origin: padding-box; background-clip: border-box; padding: 0cm 5.4pt;"
           >
            <p style="margin-bottom:0cm; line-height:normal"><b>&nbsp;</b></p>
          </td>
        </tr>
        <tr>
          <td width="460" colspan="2" valign="top" style="width:344.9pt; padding:0cm 5.4pt 0cm 5.4pt">
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size:9.0pt">CHAP - Retrouvez l’Afrique</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size:9.0pt">14 avenue de bourgogne, 91300, Massy</span></b></p>
            <p align="center" style="margin-bottom:0cm; text-align:center; line-height:normal"><b><span
                  style="font-size:9.0pt">0033-0605799059</span></b></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</body>
</html>


`,
  };


  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass,
    },
  });

  if (req.method === "POST") {
    transporter.sendMail(message2, (err, info) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err}`,
        });
      } else {
        res.status(250).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
  }
}
