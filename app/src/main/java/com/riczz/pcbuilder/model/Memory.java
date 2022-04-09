package com.riczz.pcbuilder.model;

public class Memory extends Hardware {

    private int capacity, frequency;
    private String memoryType, memoryKit, latency;

    public Memory(int id, String name, int price, int iconId, int capacity,
                  int frequency, MemoryType memoryType, MemoryKit memoryKit, Latency latency) {

        super(id, HardwareType.MEMORY, name, price, 0, iconId);
        this.capacity = capacity;
        this.frequency = frequency;
        this.memoryType = memoryType.name();
        this.memoryKit = memoryKit.name();
        this.latency = latency.name();
    }

    public Memory() {
    }

    public enum MemoryKit {
        SINGLE_CHANNEL,
        DUAL_CHANNEL,
        TRIPLE_CHANNEL,
        QUAD_CHANNEL
    }

    public enum MemoryType {
        DDR_3,
        DDR_4
    }

    public enum Latency {
        CL_10, CL_11, CL_12, CL_13, CL_14, CL_15, CL_16
    }

    @Override
    public String getDescription() {
        StringBuilder builder = new StringBuilder();
        return builder
                .append("Desktop RAM\n").append(capacity)
                .append("\nKit: ").append(memoryKit)
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
