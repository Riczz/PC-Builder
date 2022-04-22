package com.riczz.pcbuilder.model;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.Exclude;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Random;

public final class ProductItem {

    @Exclude
    private Task<QuerySnapshot> query;

    @Exclude
    private Hardware hardware;
    private String description;
    private int hardwareId;
    private float rating;

    public ProductItem(int hardwareId) {
        this.hardwareId = hardwareId;
        this.description = "";
        initialize();
    }

    public ProductItem() {
    }

    @Exclude
    private void initialize() {
        Random random = new Random();
        this.rating = Math.round(random.nextFloat() * 5.0f);
    }

    public void setHardware(Hardware hardware) {
        this.hardware = hardware;
        this.description = hardware.getDescription();
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTask(Task<QuerySnapshot> query) {
        this.query = query;
    }

    @Exclude
    public Hardware getHardware() {
        return hardware;
    }

    public String getDescription() {
        return description;
    }

    public int getHardwareId() {
        return hardwareId;
    }

    public float getRating() {
        return rating;
    }
}
