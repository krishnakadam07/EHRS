package com.EHRS.service;

import com.EHRS.entity.Prescription;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.awt.Color;

@Service
public class PdfService {

    public byte[] generatePrescriptionPdf(Prescription prescription) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        // Create a new Document
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, out);

        document.open();

        // 1. Title
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, Color.BLUE);
        Paragraph title = new Paragraph("EHRS Official Prescription", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph(" ")); // Blank space

        // 2. Doctor & Date Info
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("Date Issued: " + prescription.getDateIssued(), normalFont));
        document.add(new Paragraph("Prescribing Doctor: " + prescription.getDoctorEmail(), boldFont));
        document.add(new Paragraph("Patient ID: " + prescription.getPatientId(), normalFont));
        document.add(new Paragraph("---------------------------------------------------"));
        document.add(new Paragraph(" "));

        // 3. Medication Details
        document.add(new Paragraph("Medication: " + prescription.getMedicationName(), FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16)));
        document.add(new Paragraph("Dosage: " + prescription.getDosage(), normalFont));
        document.add(new Paragraph("Frequency: " + prescription.getFrequency(), normalFont));
        document.add(new Paragraph("Duration: " + prescription.getDuration(), normalFont));
        document.add(new Paragraph(" "));

        // 4. Notes
        document.add(new Paragraph("Doctor Notes:", boldFont));
        document.add(new Paragraph(prescription.getNotes(), normalFont));

        document.add(new Paragraph(" "));
        document.add(new Paragraph("---------------------------------------------------"));
        document.add(new Paragraph("This is a digitally generated emergency health record prescription.", FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10, Color.GRAY)));

        document.close();

        return out.toByteArray();
    }
}