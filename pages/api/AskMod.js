
import nodemailer from "nodemailer";

export default function AskMod(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;
  
  const id = req.body.id;
  const status =req.body.status;
  const nomDestinataire =req.body.nomDestinataire;
  const prenomDestinataire =req.body.prenomDestinataire;
  const adresseDest =req.body.adresseDest;
 const numeroDestinataire =req.body.numeroDestinataire;
  const villeDest =req.body.villeDest;
  const posteDest =req.body.posteDest;
  const emailDest =req.body.emailDest;
  const nomExpediteur =req.body.nomExpediteur;
  const prenomExpediteur =req.body.prenomExpediteur;
  const ville =req.body.ville;
  const rue =req.body.rue;
  const numeroExpediteur =req.body.numeroExpediteur;
  const EmailExp =req.body.email;









 

  const message2 = {
    from: email,
    to: "elloh.adja@rschain.net",
    subject: "Demande de modification du devis",
    text: `Modification d'information`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail</title>
    <!-- <script src="https://cdn.tailwindcss.com"></script> -->
</head>
<body>
    <div>
      <center> <img src="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107" width="100px" height="100px"/>
      <p style="font-size: 40px; margin-top: -10px;">CHAP</p></center>
      <p  style="margin-bottom: 10px;margin-left: 10px;" > Bonjour cher gestionnaire, </p>
     <p style="margin-bottom: 10px;margin-left: 10px;">
     Nous avons reçu une demande de modification pour le devis portant le numéro  ${id}
    </p> 
    <p style="margin-bottom: 10px;margin-left: 10px;">
      Ci-dessous les informations en question :
    </p>
    
    
   <p style="margin-bottom: 10px;margin-left: 10px;">
     <ul>
       
       <li>status : ${status}</li>
<li>Nom du destinataire : ${nomDestinataire}</li>
<li>Prenom du destinataire : ${prenomDestinataire}</li>
<li>Adresse du destinataire : ${adresseDest}</li>
<li>Numero du destinataire : ${numeroDestinataire}</li>
<li>Ville du destinataire : ${villeDest}</li>
<li>Code postal du destinataire : ${posteDest}</li>
<li>Email du destinataire : ${emailDest}</li>
<li>Nom de l'expediteur : ${nomExpediteur}</li>
<li>Prenom de l'expediteur : ${prenomExpediteur}</li>
<li>Ville de l'expediteur : ${ville}</li>
<li>Rue de l'expediteur : ${rue}</li>
<li>Numero de l'expediteur : ${numeroExpediteur}</li>
<li>Email de l'expediteur : ${EmailExp}</li>
     </ul>
   </p>
  </p>

<p style="font-weight: lighter;  margin-left: 10px;">Merci pour votre confiance <br/>L'équipe chap </p>

  
    </div>    
</body>
</html>
   `,
  };
  // console.log(req.body.subject, req.body.message);

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
          success2: `Message delivered to ${info.accepted}`,
        });
      }
    });
  }
}
