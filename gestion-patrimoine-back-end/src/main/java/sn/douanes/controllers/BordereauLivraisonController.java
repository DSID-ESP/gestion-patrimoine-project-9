package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.BordereauLivraisonService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class BordereauLivraisonController {

    @Autowired
    BordereauLivraisonService bordereauLivraisonService;




    @GetMapping("/BordereauLivraisons")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<BordereauLivraison>> getAllBordereauLivraisons() {
        List<BordereauLivraison> bordereauLivraisons = bordereauLivraisonService.getAllBordereauLivraisons();
        return new ResponseEntity<>(bordereauLivraisons, OK);
    }

    @PostMapping("/AjouterBordereauLivraison")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BordereauLivraison AjouterBordereauLivraison(@RequestBody BordereauLivraison bordereauLivraison) {

        // return bordereauLivraisonService.saveBordereauLivraison(bordereauLivraison);
        return bordereauLivraisonService.ajouterBordereauLivraison(bordereauLivraison.getNumeroBL(),bordereauLivraison.getDateBL(), bordereauLivraison.getDescriptionBL(), bordereauLivraison.getLieuDeLivraison(),bordereauLivraison.getRepresentantPrestataire(),bordereauLivraison.getCodeSection(),bordereauLivraison.getConformiteBL() ,bordereauLivraison.getMatriculeAgent(), bordereauLivraison.getNinea());
    }


    @PutMapping("/ModifierBordereauLivraison")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BordereauLivraison ModifierBordereauLivraison(@RequestBody BordereauLivraison b) {
        return bordereauLivraisonService.updateBordereauLivraison(b);
    }

    @DeleteMapping("SupprimerBordereauLivraisonById/{identifiantBordereauLivraison}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerBordereauLivraisonById(@PathVariable("identifiantBordereauLivraison") String identifiantBordereauLivraison) {
        bordereauLivraisonService.deleteBordereauLivraisonById(identifiantBordereauLivraison);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
