package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Piece;
import sn.douanes.services.PieceService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class PieceController {

    @Autowired
    PieceService pieceService;


    @GetMapping("/Pieces")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Piece>> getAllPiece() {
        List<Piece> piece = pieceService.getAllPiece();
        return new ResponseEntity<>(piece, OK);
    }


    @PostMapping("/AjouterPiece")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Piece AjouterPiece(@RequestBody Piece p) {
        return pieceService.savePiece(p);
    }



    @PutMapping("/ModifierPiece")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Piece ModifierPiece(@RequestBody Piece p) {
        return pieceService.updatePiece(p);
    }

    @DeleteMapping("SupprimerPieceById/{identifiantPiece}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerPieceById(@PathVariable("identifiantPiece") String identifiantPiece) {
        pieceService.deletePieceById(identifiantPiece);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
