package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.ArticleBonSortie;
import sn.douanes.entities.BonSortie;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.ArticleBonSortieService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
@RequestMapping( "/api")
public class ArticleBonSortieController {

    @Autowired
    ArticleBonSortieService articleBonSortieService;


    @GetMapping("/ArticleBonSorties")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<ArticleBonSortie>> getAllArticleBonSorties() {
        List<ArticleBonSortie> articleBonSortie = articleBonSortieService.getAllArticleBonSorties();
        return new ResponseEntity<>(articleBonSortie, OK);
    }

    @PostMapping("/AjouterArticleBonSortie")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonSortie  AjouterArticleBonEntree(@RequestBody ArticleBonSortie articleBonSortie) {

        return articleBonSortieService.ajouterArticleBonSortie(articleBonSortie.getIdentifiantBonSortie(), articleBonSortie.getCodeArticleBonSortie(), articleBonSortie.getLibelleArticleBonSortie(), articleBonSortie.getQuantiteAccordee(),  articleBonSortie.getMatriculeAgent());
    }


    @PutMapping("/ModifierArticleBonSortie")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonSortie ModifierArticleBonSortie(@RequestBody ArticleBonSortie a) {
        return articleBonSortieService.updateArticleBonSortie(a);
    }

    @DeleteMapping("SupprimerArticleBonSortieById/{codeArticleBonSortie}/{identifiantBonSortie}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerArticleBonSortie(
            @PathVariable("codeArticleBonSorties") Integer codeArticleBonSortie,
            @PathVariable("identifiantBonSortie") String identifiantBonSortie
    ) {
        articleBonSortieService.deleteArticleBonSortieById(codeArticleBonSortie, identifiantBonSortie);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
