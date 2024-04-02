package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.DotationVehicule;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Vehicule;
import sn.douanes.servicesSupprimer.DotationVehiculeVehiculeService;
import sn.douanes.services.VehiculeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")

public class DotationVehiculeVehiculeController {

    @Autowired
    DotationVehiculeVehiculeService dotationVehiculeVehiculeService;

    @Autowired
    VehiculeService vehiculeService;


    @GetMapping("/DotationVehiculeVehicules")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<DotationVehiculeVehicule>> getAllDotationVehiculeVehiscules() {
        List<DotationVehiculeVehicule> dotationVehiculeVehicule = dotationVehiculeVehiculeService.getAllDotationVehiculeVehicule();
        return new ResponseEntity<>(dotationVehiculeVehicule, OK);
    }


    @GetMapping("RecupererDotationByVehiculeId/{numeroSerie}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<DotationVehiculeVehicule> RecupererDotationByVehiculeId(@PathVariable("numeroSerie") String numeroSerie) {

        Vehicule vehicule =  vehiculeService.getVehiculeById(numeroSerie);
        DotationVehiculeVehicule  dotationVehiculeVehicule =  dotationVehiculeVehiculeService.getDotationVehiculeVehiculeById(vehicule);
        return new ResponseEntity<>(dotationVehiculeVehicule, OK);
    }

    @PostMapping("/AjouterDotationVehiculeVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public DotationVehiculeVehicule AjouterDotationVehiculeVehicule(@RequestBody DotationVehiculeVehicule dotationVehiculeVehicule) {
        return dotationVehiculeVehiculeService.saveDotationVehiculeVehicule(dotationVehiculeVehicule);
    }

//    @PostMapping("/AjouterRequestParamPrestatairesSecteur")
//    public ResponseEntity<PrestatairesSecteur> ajouterPrestatairesSecteur (
//            @RequestParam("ninea") Prestataires ninea,
//            @RequestParam("codeSecteurActivite") SecteurActivite codeSecteurActivite
//    ) {
//        PrestatairesSecteur prestatairesSecteur = prestatairesSecteurService.ajouterPrestatairesSecteur(ninea, codeSecteurActivite);
//        return new ResponseEntity<>(prestatairesSecteur, OK);
//    }


    @PutMapping("/ModifierDotationVehiculeVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public DotationVehiculeVehicule ModifierDotationVehiculeVehicule(@RequestBody DotationVehiculeVehicule d) {

        return dotationVehiculeVehiculeService.updateDotationVehiculeVehicule(d);
    }

    @DeleteMapping("SupprimerDotationVehiculeVehiculeById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerDotationVehiculeVehiculeById(
            @PathVariable("numeroSerie") Vehicule numeroSerie,
            @PathVariable("identifiantDV") DotationVehicule identifiantDV
    ) {
        dotationVehiculeVehiculeService.deleteDotationVehiculeVehiculeById(numeroSerie, identifiantDV);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
