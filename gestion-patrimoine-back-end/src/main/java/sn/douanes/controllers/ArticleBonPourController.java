package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.ArticleBonPour;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.ArticleBonPourService;
import sn.douanes.services.BonPourService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
@RequestMapping( "/api")
public class ArticleBonPourController {

    @Autowired
    ArticleBonPourService articleBonPourService;

    @Autowired
    BonPourService bonPourService;

    
    @GetMapping("/ArticleBonPours")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<ArticleBonPour>> getAllArticleBonPours() {
        List<ArticleBonPour> articleBonPour = articleBonPourService.getAllArticleBonPours();
        return new ResponseEntity<>(articleBonPour, OK);
    }

    @PostMapping("/AjouterArticleBonPour")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonPour AjouterArticleBonPour(@RequestBody ArticleBonPour articleBonPour) {
        return articleBonPourService.ajouterArticleBonPour(articleBonPour.getIdentifiantBonPour(), articleBonPour.getCodeArticleBonPour(), articleBonPour.getLibelleArticleBonPour(), articleBonPour.getQuantiteDemandee(), articleBonPour.getCodeTypeObjet(), articleBonPour.getMatriculeAgent());
    }


    @PutMapping("/ModifierArticleBonPour")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonPour ModifierArticleBonPour(@RequestBody ArticleBonPour a) {
        return articleBonPourService.updateArticleBonPour(a);
    }

    @DeleteMapping("SupprimerArticleBonPourById/{codeArticleBonPour}/{identifiantBonPour}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerArticleBonPour(
            @PathVariable("codeArticleBonPour") Integer codeArticleBonPour,
            @PathVariable("identifiantBonPour") String identifiantBonPour
    ) {
        articleBonPourService.deleteArticleBonPourById(codeArticleBonPour, identifiantBonPour);
    }

    @GetMapping("RecupererArticleBonPourById/{codeArticleBonPour}/{identifiantBonPour}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonPour RecupererArticleBonPourById(
            @PathVariable("codeArticleBonPour") Integer codeArticleBonPour,
            @PathVariable("identifiantBonPour") String identifiantBonPour
    ) {
        return articleBonPourService.getArticleBonPourById(codeArticleBonPour, identifiantBonPour);
    }

    @GetMapping("RecupererTousArticleBonPourById/{identifiantBonPour}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public List<ArticleBonPour> RecupererTousArticleBonPourById(
            @PathVariable("identifiantBonPour") String identifiantBonPour
    ) {
        return articleBonPourService.getAllArticleBonSortieById(identifiantBonPour);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
