package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.servicesSupprimer.ChangementPieceService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
public class ChangementPieceController {

    @Autowired
    ChangementPieceService changementPieceService;

    @GetMapping("/ChangementPieces")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<ChangementPiece>> getAllChangementPieces() {
        List<ChangementPiece> changementPiece = changementPieceService.getAllChangementPieces();
        return new ResponseEntity<>(changementPiece, OK);
    }

    @PostMapping("/AjouterChangementPiece")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ChangementPiece AjouterChangementPiece(@RequestBody ChangementPiece c) {
        return changementPieceService.saveChangementPiece(c);
    }

    @PutMapping("/ModifierChangementPiece")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ChangementPiece ModifierChangementPiece(@RequestBody ChangementPiece c) {
        return changementPieceService.updateChangementPiece(c);
    }

    @DeleteMapping("SupprimerChangementPieceById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerChangementPieceById(@PathVariable("id") String numeroImmatriculation) {
        changementPieceService.deleteChangementPieceById(numeroImmatriculation );
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
