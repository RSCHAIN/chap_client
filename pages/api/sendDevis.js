import nodemailer from "nodemailer";

export default function handler(req, res) {

  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;
  const categorie = req.body.category;
  const Partenaire = req.body.partenaire;
  const nomDest = req.body.nomDest;
  const prenomDest = req.body.prenomDest;
  const rue = req.body.rue;
  const postal = req.body.postal;
  const ville = req.body.ville;
  const jour = req.body.jour;
  const quantity = req.body.quantity;
  const details = req.body.details;

console.log(details)

if (req.body.moyen === "Aerien") {
 
}

 
  const message2 = {
    from: email,
    to: `lauria.guenaman@rschain.net`,
    subject: ` ${ req.body.subject } `,
    text: `Recapitulatif de devis`,
    html:  `< !DOCTYPE html >
  <html lang="en">
    <head>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>test</title>

        </head>
        <body>
          <div >
            <div >
              <img style="margin-left: 40%;" width="200px" height="100px" src="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107" />
            </div>
          </div >
          <div style="margin-left: 5%;font-size: 20px;">

            <p style="font-size: 25px;margin-bottom:20px">le récapitulatif de la commande de ${req.body.nom2} avec l'id ${req.body.id}</p>
            <u style="margin-left: 30px;font-size: 25px;">${req.body.quantity} Colis</u>
            <p style="margin-left: 60px;">les differents types de produit</p>
            <div>
              <p style="margin-left: 30px; font-weight:600">Details : </p>
              <div style="display: flex; justify-content:space-between;width:500px;">
                <p>Dépôt/Retrait : ${req.body.depot}</p>

              </div>
              <p>Expéditeur : ${req.body.nomExp} résident à ${rue} ${postal} ${ville}</p>

              <p>Durée de livraison : ${jour}</p>
            </div>
            <p style="font-size: 18px;">Nous allons fait suite a votre demande assez rapidement, quand nous nous recevrons les offres de nos patenaires.</p>


            <p style="font-size: 18px;">Merci pour votre confiance,</p>
            <p style="font-size: 18px;">Des questions ? N'hesitez pas à nous contacter srschain@gmail.com</p>
            <p style="font-size: 18px;">L'équipe CHAP</p>






          </div>

        </body>
      </html>`,
  };

  
 
          let transporter = nodemailer.createTransport({
            service: "gmail",
          auth: {
            user: email,
          pass,
    },
  });

          if (req.method === "POST") {
    if(req.body.moyen=="Maritime"){
      const besoin = req.body.besoin;
      const message3 = {
        from: email,
        to: req.body.email,
        subject: ` ${req.body.subject}`,
        text: `Recapitulatif de devis`,
        html: `<!DOCTYPE html>
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
              <p  style="margin-bottom: 10px;margin-left: 10px;" > Merci Mr/Mme ${req.body.nomExp}  nous avons reçu votre demande de devis N° ${req.body.devisId} </p>
             <p style="margin-bottom: 10px;margin-left: 10px;">
              Le recapitulatif de votre demande de devis est le suivant : 
            </p> 
            <p style="margin-bottom: 10px;margin-left: 10px; text-decoration: underline;">
              ${quantity} Colis 
            </p>
            `+
    
    
          `<ul >${categorie.map((element, index) => {
            
              
              return `<li style="font-weight:semibold">${element}</li>
               <ul>
                  <li >Descitption: ${details[index]}</li>
                  <li >Besoin de materiel?<b>${besoin[index]?"oui":"non"}</b></li>
                
                
                  
               </ul>
               `
           
              })
    }
            </ul > `
             
            
             
                
            
            
           +   
            `
    
      <p style = "margin-bottom: 10px;margin-left: 10px;" > Dépot: ${ req.body.depot }
    <br />Livraison: A domicile
      <br /> Expéditeur: ${ req.body.nomExp }
    <br />Adresse:  ${ rue } ${ postal } ${ ville }
    <br />Destinataire:  ${ nomDest } ${ prenomDest }
         
      <br />Durée: ${ jour }</p >
        <p style="font-weight: lighter; color: dimgrey; font-size: small;margin-left: 10px;font-style: italic;"> Nous allons faire suite à votre demande dès la validation du devis par nos partenaires. </p>
        <p style="font-weight: lighter; margin-left: 10px;"> Vous pouvez consulter l'état de votre devis depuis votre <b>compte</b> dans la section <b>"Mes devis"</b> </p>
        <p style="font-weight: lighter;  margin-left: 10px;">Des questions ? Retrouvez. nous dans la section nous <a target="_blank" href="#"> nous contacter</a>  </p>
        <p style="font-weight: lighter;  margin-left: 10px;">Merci pour votre confiance <br/>L'équipe chap </p>
        
          
            </div >    
        </body >
        </html > `,
      };
            transporter.sendMail(message3, (err, info) => {
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
          else{
            const message = {
              from: email,
              to: req.body.email,
              subject: ` ${req.body.subject}`,
              text: `Recapitulatif de devis`,
              html: `<!DOCTYPE html>
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
                    <p  style="margin-bottom: 10px;margin-left: 10px;" > Merci Mr/Mme ${req.body.nomExp}  nous avons reçu votre demande de devis N° ${req.body.devisId} </p>
                   <p style="margin-bottom: 10px;margin-left: 10px;">
                    Le recapitulatif de votre demande de devis est le suivant : 
                  </p> 
                  <p style="margin-bottom: 10px;margin-left: 10px; text-decoration: underline;">
                    ${categorie.length} Colis 
                  </p>
                  `+
          
          
                `<ul >${categorie.map((element, index) => (
                  
          
                     `<li style="font-weight:semibold">${element}</li>
                     <ul>
                     <li style="font-weight:lighter">${req.body.description[index]}</li>
                        <li style="font-weight:lighter">${req.body.poids[index]}</li>
                        
                        
                     </ul>
                     `
                  
                      ))
          }
                  </ul > `
                   
                  
                   
                      
                  
                  
                 +   
                  `
          
            <p style = "margin-bottom: 10px;margin-left: 10px;" > Dépot: ${ req.body.depot }
          <br />Livraison: A domicile
            <br /> Expéditeur: ${ req.body.nomExp }
          <br />Adresse:  ${ rue } ${ postal } ${ ville }
          <br />Destinataire:  ${ nomDest } ${ prenomDest }
               
            <br />Durée: ${ jour }</p >
              <p style="font-weight: lighter; color: dimgrey; font-size: small;margin-left: 10px;font-style: italic;"> Nous allons faire suite à votre demande dès la validation du devis par nos partenaires. </p>
              <p style="font-weight: lighter; margin-left: 10px;"> Vous pouvez consulter l'état de votre devis depuis votre <b>compte</b> dans la section <b>"Mes devis"</b> </p>
              <p style="font-weight: lighter;  margin-left: 10px;">Des questions ? Retrouvez. nous dans la section nous <a target="_blank" href="#"> nous contacter</a>  </p>
              <p style="font-weight: lighter;  margin-left: 10px;">Merci pour votre confiance <br/>L'équipe chap </p>
              
                
                  </div >    
              </body >
              </html > `,
            };
            transporter.sendMail(message, (err, info) => {
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
}
