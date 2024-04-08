package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.exception.PrestatairesExistException;
import sn.douanes.exception.PrestatairesNotFoundException;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Prestataires;
import sn.douanes.entities.SecteurActivite;
import sn.douanes.services.PrestatairesService;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.springframework.http.HttpStatus.OK;
import static sn.douanes.constants.ApplicationConstants.PRESTATAIRES_DELETED_SUCCESSFULLY;

@RestController
@RequestMapping( "/api")
public class PrestatairesController {


    @Autowired
    PrestatairesService prestatairesService;


    @GetMapping("/Prestataires")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Prestataires>> getAllPrestataires() {

        // METHODE 1
        // List<Prestataires> prestataires = prestatairesService.getAllPrestataires();
        // if (prestataires.isEmpty()) {
        //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // } else {
        //     for (Prestataires prestataire : prestataires) {
        //         Set<SecteurActivite> secteursActivite = prestatairesService.getSecteurActiviteByPrestataires(prestataire);
        //         prestataire.setSecteurActivite(secteursActivite);
        //    }
        //    return new ResponseEntity<>(prestataires, HttpStatus.OK);
        // }



        // METHODE 2
//        List<Prestataires> prestataires = prestatairesService.getAllPrestataires();
//        // Charger les secteurs d'activité de manière paresseuse (lazy) avant de retourner la réponse
//        prestataires.forEach(prestataire -> prestataire.getSecteurActivite().size());
//        return new ResponseEntity<>(prestataires, HttpStatus.OK);

        // METHODE 3
         List<Prestataires> prestataires = prestatairesService.getAllPrestatairesWithSecteursActivite();

         return new ResponseEntity<>(prestataires, HttpStatus.OK);
    }

    @PostMapping("/AjouterPrestataires")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<?> AjouterPrestataires(@RequestBody Prestataires prestataires) throws PrestatairesExistException {
        // Assurez-vous que SecteurActivite n'est pas null pour éviter la NullPointerException
//        if (prestataires.getSecteurActivite() != null) {
//            // Récupérer les entités SecteurActivite associées à Prestataires
//            Set<SecteurActivite> secteurActivites = prestataires.getSecteurActivite();
//
//            // Associer Prestataires avec chaque SecteurActivite
//            for (SecteurActivite secteurActivite : secteurActivites) {
//                // Assurez-vous que l'ensemble Prestataires dans SecteurActivite n'est pas null
//                if (secteurActivite.getPrestataires() == null) {
//                    secteurActivite.setPrestataires(new HashSet<>());
//                }
//
//                // Associer Prestataires avec SecteurActivite
//                secteurActivite.getPrestataires().add(prestataires);
//            }
//
//            // Mettre à jour l'ensemble de SecteurActivite associé à l'entité Prestataires
//            prestataires.setSecteurActivite(secteurActivites);
//        }

       /* if (prestatairesService.getPrestatairesById(prestataires.getNinea()) == null) {
            return new ResponseEntity<>("Le prestataire existe déjà.", HttpStatus.CONFLICT); // HttpStatus.CONFLICT indique un conflit
        }*/

        // Enregistrer l'entité Prestataires avec ses associations
        // Prestataires savedPrestataires = prestatairesService.ajouterPrestataires(prestataires.getNinea(), prestataires.getRaisonSociale(), prestataires.getNumeroTelephone(), prestataires.getAdresseEmail(), prestataires.getAdresse(), prestataires.getSecteurActivite());

        // Retourner l'entité Prestataires avec le statut 201 Created
        // return new ResponseEntity<>(savedPrestataires, HttpStatus.CREATED);

        // return ResponseEntity.badRequest().body("L'utilisateur avec le nom d'utilisateur '" + username + "' existe déjà.");
        // return ResponseEntity.ok("Utilisateur ajouté avec succès.");


//        try {
//            // Enregistrer l'entité Prestataires avec ses associations
//            Prestataires savedPrestataires = prestatairesService.ajouterPrestataires(
//                    prestataires.getNinea(),
//                    prestataires.getRaisonSociale(),
//                    prestataires.getNumeroTelephone(),
//                    prestataires.getAdresseEmail(),
//                    prestataires.getAdresse(),
//                    prestataires.getSecteurActivite());
//
//            // Retourner l'entité Prestataires avec le statut 201 Created
//            return new ResponseEntity<>(savedPrestataires, HttpStatus.CREATED);
//        } catch (PrestatairesExistException e) {
//            // Capturer l'exception PrestatairesExistException
//            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage() + " " + prestataires.getNinea());
//        }

        try {
            // Enregistrer l'entité Prestataires avec ses associations
            Prestataires savedPrestataires = prestatairesService.savePrestataires(prestataires);

            // Retourner l'entité Prestataires avec le statut 201 Created
            return new ResponseEntity<>(savedPrestataires, HttpStatus.CREATED);
        } catch (PrestatairesExistException e) {
            // Capturer l'exception PrestatairesExistException
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage() + " " + prestataires.getNinea());
        }
    }




    @PutMapping("/ModifierPrestataires")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    // @PostAuthorize("hasAuthority('ADMINISTRATEUR')")
    public ResponseEntity<Prestataires> ModifierPrestataires(@RequestBody Prestataires prestataires) throws PrestatairesNotFoundException {

        Prestataires updatePrestataires = prestatairesService.updatePrestataires(prestataires);
        // Retourner l'entité Prestataires avec le statut 201 Created
        return new ResponseEntity<>(updatePrestataires, OK);
    }

    @DeleteMapping("SupprimerPrestatairesById/{ninea}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<HttpResponse> SupprimerPrestatairesById(@PathVariable("ninea") String ninea) {

        prestatairesService.deletePrestatairesById(ninea);
        // return response(OK, PRESTATAIRES_DELETED_SUCCESSFULLY + ninea);
        return response(OK, PRESTATAIRES_DELETED_SUCCESSFULLY);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
