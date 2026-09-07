package com.EHRS.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    // Initializes the AWS S3 Client using your .env credentials
    public S3Service(@Value("${aws.s3.access.key}") String accessKey,
                     @Value("${aws.s3.secret.key}") String secretKey,
                     @Value("${aws.s3.region}") String region) {

        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }

    // Notice we added the 'String email' parameter here!
    public String uploadFile(MultipartFile file, String email) throws IOException {

        // 🌟 This creates a folder in AWS S3 based on the user's email!
        String uniqueFileName = email + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueFileName)
                .contentType(file.getContentType())
                .build();

        // Upload to S3
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // Return the public URL of the uploaded file
        return "https://" + bucketName + ".s3." + s3Client.serviceClientConfiguration().region().id() + ".amazonaws.com/" + uniqueFileName;
    }
}