package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.Accident;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.ChangementPiece;
import sn.douanes.entities.keys.ChangementPieceId;
import sn.douanes.services.ChangementPieceService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
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

    @DeleteMapping("SupprimerChangementPieceById/{codeChangementPiece}/{identifiantChangementPiece}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerChangementPieceById(
            @PathVariable("codeChangementPiece") Integer codeChangementPiece,
            @PathVariable("identifiantMaintenance") String identifiantMaintenance
    ) {
        changementPieceService.deleteChangementPieceById(codeChangementPiece, identifiantMaintenance);
    }


    @GetMapping("RecupererChangementPieceById/{codeChangementPiece}/{identifiantMaintenance}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ChangementPiece RecupererChangementPieceById(
            @PathVariable("codeChangementPiece") Integer codeChangementPiece,
            @PathVariable("identifiantMaintenance") String identifiantMaintenance
    ) {
        return changementPieceService.getChangementPieceById(codeChangementPiece, identifiantMaintenance);
    }

    @GetMapping("recupererChangementPieceByIdentifiantMaintenance/{identifiantMaintenance}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public List<ChangementPiece> recupererChangementPieceByIdentifiantMaintenance(
            @PathVariable("identifiantMaintenance") String identifiantMaintenance
    ) {
        return changementPieceService.getAllChangementPiecesByIdentifiantMaintenance(identifiantMaintenance);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
