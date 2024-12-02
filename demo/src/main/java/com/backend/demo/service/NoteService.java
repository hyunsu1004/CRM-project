package com.backend.demo.service;

import com.backend.demo.entity.Deal;
import com.backend.demo.entity.DealNote;
import com.backend.demo.entity.Note;
import com.backend.demo.repository.DealNoteRepository;
import com.backend.demo.repository.DealRepository;
import com.backend.demo.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private DealRepository dealRepository;
    @Autowired
    private DealNoteRepository dealNoteRepository;
    //메인페이지 노트 생성 후 작성.
    public Note createNote(Note note) {
        //제목 또는 내용이 비어있는 경우 예외 처리
        if(note.getTitle() == null || note.getTitle().isEmpty()){
            throw new IllegalArgumentException("노트 제목은 필수입니다.");
        }if(note.getContent() == null || note.getContent().isEmpty()){
            throw new IllegalArgumentException("노트 내용은 필수입니다.");
        }
        //노트 저장.
        return noteRepository.save(note);
    }

    //메인페이지 노트 삭제하는 기능
    public void deleteNoteByid (Integer id) {
        //ID로 존재 여부 확인
        if(!noteRepository.existsById(id)){
            throw new IllegalArgumentException("해당 ID를 가진 노트가 존재하지 않습니다.");
        }
        noteRepository.deleteById(id);
    }

    //딜 페이지 노트 생성 후 작성.
    public DealNote createdNoteForDeal(int dealId, DealNote note) {
        //딜 ID로 Deal 데이터베이스 조회
        Deal deal = dealRepository.findById((int)dealId)
                .orElseThrow(()-> new IllegalArgumentException("해당 딜이 존재하지 않습니다."));

        //DealNote에 Deal 연결
        note.setDeal(deal);
        //Note 저장.
        return dealNoteRepository.save(note);
    }

    //딜 페이지 노트 수정.
    public DealNote updateNoteForDeal(String startupName,int noteId, DealNote updateNote) {
        DealNote existingNote = dealNoteRepository.findById(noteId)
                .orElseThrow(()-> new IllegalArgumentException("노트가 발견되지 않았습니다."));
        if(!existingNote.getDeal().getStartupName().equals(startupName)){
            throw new IllegalArgumentException("스타트업 이름과 맞지 않습니다.");
        }
        existingNote.setTitle(updateNote.getTitle());
        existingNote.setContent(updateNote.getContent());
        return dealNoteRepository.save(existingNote);
    }

    //특정 DealId에 해당하는 모든 노트 가져오기.
    public List<DealNote> getNotesByDealId(int dealId) {
        return dealNoteRepository.findByDealId(dealId);
    }






}
