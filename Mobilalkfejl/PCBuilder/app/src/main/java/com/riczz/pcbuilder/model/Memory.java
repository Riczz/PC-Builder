package com.riczz.pcbuilder.model;

import androidx.annotation.NonNull;

import com.google.firebase.firestore.Exclude;

import org.apache.commons.text.WordUtils;

import java.io.Serializable;
import java.util.Locale;

public final class Memory extends Hardware implements Serializable {

    private int capacity, frequency;
    private String memoryType, memoryKit, latency;

    public Memory(int id, String name, int price, int iconId, int capacity,
                  int frequency, MemoryType memoryType, MemoryKit memoryKit, Latency latency) {

        super(id, HardwareType.MEMORY, name, price, 0, iconId);
        this.capacity = capacity;
        this.frequency = frequency;
        this.memoryType = memoryType.toString();
        this.memoryKit = memoryKit.toString();
        this.latency = latency.toString();
    }

    public Memory() {
    }

    public enum MemoryKit {
        SINGLE_CHANNEL,
        DUAL_CHANNEL,
        TRIPLE_CHANNEL,
        QUAD_CHANNEL;

        @NonNull
        @Override
        public String toString() {
            return WordUtils.capitalize(super.toString().replace('_', ' ').toLowerCase(Locale.ROOT));
        }
    }

    public enum MemoryType {
        DDR_3,
        DDR_4;

        @NonNull
        @Override
        public String toString() {
            return super.toString().replace('_', ' ');
        }
    }

    public enum Latency {
        CL_10, CL_11, CL_12, CL_13, CL_14, CL_15, CL_16;

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
                .append("Desktop RAM\n").append(capacity)
                .append(" GB\nKit: ").append(memoryKit)
                .append("\nType: ").append(memoryType)
                .append("\nFrequency: ").append(frequency)
                .toString();
    }

    public int getCapacity() {
        return capacity;
    }

    public int getFrequency() {
        return frequency;
    }

    public String getMemoryType() {
        return memoryType;
    }

    public String getMemoryKit() {
        return memoryKit;
    }

    public String getLatency() {
        return latency;
    }
}
