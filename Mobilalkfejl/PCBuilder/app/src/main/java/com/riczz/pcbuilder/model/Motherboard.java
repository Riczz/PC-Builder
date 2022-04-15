package com.riczz.pcbuilder.model;

import androidx.annotation.NonNull;

import com.google.firebase.firestore.Exclude;

import java.io.Serializable;

public class Motherboard extends Hardware implements Serializable {

    private int maxMemory;
    private String size, memoryType, socket;

    public Motherboard(int id, String name, int price, int iconId, int maxMemory,
                       MotherboardType size, Memory.MemoryType memoryType, CPU.Socket socket) {

        super(id, HardwareType.MOTHERBOARD, name, price, 0, iconId);
        this.maxMemory = maxMemory;
        this.size = size.toString();
        this.memoryType = memoryType.toString();
        this.socket = socket.toString();
    }

    public Motherboard() {
    }

    public enum MotherboardType {
        MINI_ITX,
        MICRO_ATX,
        ATX,
        EATX;

        @NonNull
        @Override
        public String toString() {
            return super.toString().replace('_', ' ');
        }
    }

    @Exclude
    @Override
    public String getDescription() {
        StringBuilder builder = new StringBuilder();
        return builder
                .append("Desktop motherboard\nSize format: ").append(maxMemory)
                .append("\nMax. memory: ").append(maxMemory)
                .append("\nSocket: ").append(socket)
                .toString();
    }

    public int getMaxMemory() {
        return maxMemory;
    }

    public String getSize() {
        return size;
    }

    public String getMemoryType() {
        return memoryType;
    }

    public String getSocket() {
        return socket;
    }
}
