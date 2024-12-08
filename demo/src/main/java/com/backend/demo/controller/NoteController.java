package com.backend.demo.controller;


import com.backend.demo.entity.DealNote;
import com.backend.demo.entity.Note;
import com.backend.demo.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//메인 화면에서 보이는 노트를 클릭하면 들어가서 노트 추가/삭제 하는 기능

@RestController
public class NoteController {
    @Autowired
    private NoteService noteService;

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

    //메인 페이지 노트에 있는 목록 확인API
    @GetMapping("/api/member/notes")
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    //딜 페이지 노트 생성 API
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/member/deals/{id}/notes")
    public ResponseEntity<DealNote> dealNote(@PathVariable int id,@RequestBody DealNote dealNote) {
        try {
            DealNote createdDealNote = noteService.createdNoteForDeal(id, dealNote);
            return ResponseEntity.ok(createdDealNote);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    //딜 페이지에서 노트보기를 눌렀을 떄 dealId에 따라 모든 노트를 반환.
    @GetMapping("api/member/deals/notes/{dealId}")
    public List<DealNote> getDealNotes(@PathVariable Integer dealId) {
        return noteService.getNotesByDealId(dealId);
    }






}
