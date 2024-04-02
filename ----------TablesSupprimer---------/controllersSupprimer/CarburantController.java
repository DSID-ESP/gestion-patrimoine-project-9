package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.servicesSupprimer.CarburantService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
public class CarburantController {

    @Autowired
    CarburantService carburantService;

    @GetMapping("/Carburants")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Carburant>> getAllCarburants() {
        List<Carburant> carburant = carburantService.getAllCarburants();
        return new ResponseEntity<>(carburant, OK);
    }

    @PostMapping("/AjouterCarburant")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Carburant AjouterCarburant(@RequestBody Carburant c) {
        return carburantService.saveCarburant(c);
    }

    @PutMapping("/ModifierCarburant")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Carburant ModifierCarburant(@RequestBody Carburant c) {
        return carburantService.updateCarburant(c);
    }

    @DeleteMapping("SupprimerCarburantById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerCarburantById(@PathVariable("id") String numeroCarte) {
        carburantService.deleteCarburantById(numeroCarte);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
