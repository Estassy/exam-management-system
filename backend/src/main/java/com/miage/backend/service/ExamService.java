package com.miage.backend.service;

import com.miage.backend.entity.Exam;
import com.miage.backend.entity.User;
import com.miage.backend.exception.ResourceNotFoundException;
import com.miage.backend.repository.ExamRepository;
import com.miage.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(UUID id, Exam updatedExam) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        exam.setTitle(updatedExam.getTitle());
        exam.setDate(updatedExam.getDate());
        exam.setTeacher(updatedExam.getTeacher());
        // Mettez à jour d'autres champs si nécessaire
        return examRepository.save(exam);
    }

    public Exam addStudentToExam(UUID examId, UUID studentId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Examen non trouvé pour l'ID : " + examId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));
        exam.getStudents().add(student);
        return examRepository.save(exam);
    }

    public Exam removeStudentFromExam(UUID examId, UUID studentId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Examen non trouvé pour l'ID : " + examId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Étudiant non trouvé pour l'ID : " + studentId));
        exam.getStudents().remove(student);
        return examRepository.save(exam);
    }

    public void deleteExam(UUID id) {
        examRepository.deleteById(id);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(UUID id) {
        return examRepository.findById(id);
    }

    public Optional<Exam> getFirstExamByTeacher(String teacher) {
        return examRepository.findFirstByTeacherOrderByDateAsc(teacher);
    }
}
