package com.backend.demo.controller;


import com.backend.demo.entity.DealNote;
import com.backend.demo.entity.Note;
import com.backend.demo.repository.DealNoteRepository;
import com.backend.demo.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//메인 화면에서 보이는 노트를 클릭하면 들어가서 노트 추가/삭제 하는 기능

@RestController
public class NoteController {
    @Autowired
    private NoteService noteService;
    @Autowired
    private DealNoteRepository dealNoteRepository;

    //메인페이지 노트 생성 API
    @PostMapping("/api/member/notes")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note createdNote = noteService.createNote(note);
        return ResponseEntity.ok(createdNote);
    }
    //메인 페이지 노트 삭제 API
    @DeleteMapping("/api/member/notes/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Integer id) {
        try {
            noteService.deleteNoteByid(id);
            return ResponseEntity.ok("노트가 성공적으로 삭제되었습니다.");
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //딜 페이지 노트 생성 API
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/member/deals/{id}/notes")
    public ResponseEntity<DealNote> dealNote(@PathVariable("id") int id,@RequestBody DealNote dealNote) {
        try {
            DealNote createdDealNote = noteService.createdNoteForDeal(id, dealNote);
            return ResponseEntity.ok(createdDealNote);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(null);
        }

    }
    //딜에 대한 노트 수정.
    @PutMapping("/api/member/deals/{startupName}/notes/{id}")
    public ResponseEntity<DealNote> updateNote(
            @PathVariable String startupName,
            @PathVariable int id,
            @RequestBody DealNote updatedNote){
        try {
            DealNote updated = noteService.updateNoteForDeal(startupName, id, updatedNote);
            return ResponseEntity.ok(updated);
        }catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 딜 페이지 노트 삭제 API (하나의 노트 삭제)
    @DeleteMapping("/api/member/deals/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable("noteId") int noteId) {
        try {
            // 하나의 노트 삭제
            noteService.deleteNoteForDeal(noteId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //딜 페이지 여러 노트 삭제 API
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/api/member/deals/{dealId}/notes")
    public ResponseEntity<Void> deleteNotes(@PathVariable int dealId,@RequestBody List<Integer> noteIds) {
        try{
            //dealId와 noteId에 해당하는 노트들을 삭제.
            noteService.deleteNotesForDeal(dealId, noteIds);
            return ResponseEntity.noContent().build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //딜 페이지에서 노트보기를 눌렀을 떄 dealId에 따라 모든 노트를 반환.
    @GetMapping("/api/notes/{dealId}")
    public List<DealNote> getDealNotes(@PathVariable("dealId") Integer dealId) {
        return noteService.getNotesByDealId(dealId);
    }


}







