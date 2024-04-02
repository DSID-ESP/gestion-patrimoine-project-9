package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;
import sn.douanes.servicesSupprimer.UniteDouaniereSectionsService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
public class UniteDouaniereSectionsController {

    @Autowired
    UniteDouaniereSectionsService uniteDouaniereSectionsService;


    @GetMapping("/UniteDouaniereSections")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<UniteDouaniereSections>> getAllUniteDouaniereSectionss() {
        List<UniteDouaniereSections> uniteDouaniereSections = uniteDouaniereSectionsService.getAllUniteDouaniereSections();
        return new ResponseEntity<>(uniteDouaniereSections, OK);
    }

    @PostMapping("/AjouterUniteDouaniereSectionss")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public UniteDouaniereSections AjouterUniteDouaniereSections(@RequestBody UniteDouaniereSections uniteDouaniereSections) {
        return uniteDouaniereSectionsService.saveUniteDouaniereSections(uniteDouaniereSections);
    }

    @PostMapping("/AjouterRequestParamUniteDouaniereSections")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<UniteDouaniereSections> ajouterUniteDouaniereSections (
            @RequestParam("codeUniteDouaniere") UniteDouaniere codeUniteDouaniere,
            @RequestParam("codeSection") Sections codeSection
    ) {
        UniteDouaniereSections uniteDouaniereSections = uniteDouaniereSectionsService.ajouterUniteDouaniereSections(codeUniteDouaniere, codeSection);
        return new ResponseEntity<>(uniteDouaniereSections, OK);
    }


    @PutMapping("/ModifierUniteDouaniereSections")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public UniteDouaniereSections ModifierUniteDouaniereSections(@RequestBody UniteDouaniereSections p) {

        return uniteDouaniereSectionsService.updateUniteDouaniereSections(p);
    }

    @DeleteMapping("SupprimerUniteDouaniereSectionsById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerUniteDouaniereSectionsById(
            @PathVariable("codeUniteDouaniere") UniteDouaniere codeUniteDouaniere,
            @PathVariable("codeSection") Sections codeSection
    ) {
        uniteDouaniereSectionsService.deleteUniteDouaniereSectionsById(codeUniteDouaniere, codeSection);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
