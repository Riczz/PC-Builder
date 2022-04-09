package com.riczz.pcbuilder.model;

import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.Exclude;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Random;

public class ProductItem {

    @Exclude
    private Task<QuerySnapshot> query;

    @Exclude
    private Hardware hardware;
    private int hardwareId;
    private float rating;

    public ProductItem(int hardwareId) {
        this.hardwareId = hardwareId;
        initialize();
    }

    public ProductItem() {
    }

    @Exclude
    private void initialize() {
        Random random = new Random();
        this.rating = Math.round(random.nextFloat() * 5.0f);
    }

    public void setQuery(Task<QuerySnapshot> query) {
        this.query = query;
    }

    public void setHardware(Hardware hardware) {
        this.hardware = hardware;
    }

    @Exclude
    public Task<QuerySnapshot> getQuery() {
        return query;
    }

    public Hardware getHardware() {
        return hardware;
    }

    public int getHardwareId() {
        return hardwareId;
    }

    public float getRating() {
        return rating;
    }
}
