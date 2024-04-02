package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.ArticleBonEntree;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.ArticleBonEntreeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class ArticleBonEntreeController {

    @Autowired
    ArticleBonEntreeService articleBonEntreeService;

    
    @GetMapping("/ArticleBonEntrees")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<ArticleBonEntree>> getAllArticleBonEntrees() {
        List<ArticleBonEntree> articleBonEntree = articleBonEntreeService.getAllArticleBonEntrees();
        return new ResponseEntity<>(articleBonEntree, OK);
    }

    @PostMapping("/AjouterArticleBonEntree")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonEntree AjouterArticleBonEntree(@RequestBody ArticleBonEntree articleBonEntree) {
        return articleBonEntreeService.ajouterArticleBonEntree(articleBonEntree.getCodeArticleBonEntree(),articleBonEntree.getIdentifiantBE(), articleBonEntree.getLibelleArticleBonEntree(),articleBonEntree.getCodeLieuVH(), articleBonEntree.getQuantiteEntree(), articleBonEntree.getCodeTypeObjet(), articleBonEntree.getMatriculeAgent());
    }


//    @PostMapping("/AjouterRequestParamArticleBonEntree")
//    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
//    public ResponseEntity<ArticleBonEntree> ajouterArticleBonEntree (
//            @RequestParam("identifiantBE") BonEntree identifiantBE,
//            @RequestParam("codeArticleBonEntree") String codeArticleBonEntree,
//            @RequestParam("libelleArticleBonEntree") String libelleArticleBonEntree,
//            @RequestParam("quantiteEntree") Integer quantiteEntree,
//            @RequestParam("codeTypeObjet") TypeObjet codeTypeObjet,
//            @RequestParam("codeLieuVH") LieuStockageVehicule codeLieuVH,
//            @RequestParam("matriculeAgent") Agent matriculeAgent
//    ) {
//        ArticleBonEntree articleBonEntree = articleBonEntreeService.ajouterArticleBonEntree(identifiantBE, codeArticleBonEntree, libelleArticleBonEntree, quantiteEntree, codeTypeObjet,codeLieuVH, matriculeAgent);
//        return new ResponseEntity<>(articleBonEntree, OK);
//    }


    @PutMapping("/ModifierArticleBonEntree")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonEntree ModifierArticleBonEntree(@RequestBody ArticleBonEntree a) {
        return articleBonEntreeService.updateArticleBonEntree(a);
    }

    @DeleteMapping("SupprimerArticleBonEntreeById/{codeArticleBonEntree}/{identifiantBE}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerArticleBonEntree(
            @PathVariable("codeArticleBonEntree") Integer codeArticleBonEntree,
            @PathVariable("identifiantBonEntree") String identifiantBonEntree
    ) {
        articleBonEntreeService.deleteArticleBonEntreeById(codeArticleBonEntree, identifiantBonEntree);
    }


    @GetMapping("RecupererArticleBonEntreeById/{codeArticleBonEntree}/{identifiantBonEntree}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ArticleBonEntree RecupererAgentById(
            @PathVariable("codeArticleBonEntree") Integer codeArticleBonEntree,
            @PathVariable("identifiantBonEntree") String identifiantBonEntree
    ) {
        return articleBonEntreeService.getArticleBonEntreeById(codeArticleBonEntree, identifiantBonEntree);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
