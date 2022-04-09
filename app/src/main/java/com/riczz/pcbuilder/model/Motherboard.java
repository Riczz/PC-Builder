package com.riczz.pcbuilder.model;

public class Motherboard extends Hardware {

    private int maxMemory;
    private String size, memoryType, socket;

    public Motherboard(int id, String name, int price, int iconId, int maxMemory,
                       MotherboardType size, Memory.MemoryType memoryType, CPU.Socket socket) {

        super(id, HardwareType.MOTHERBOARD, name, price, 0, iconId);
        this.maxMemory = maxMemory;
        this.size = size.name();
        this.memoryType = memoryType.name();
        this.socket = socket.name();
    }

    public Motherboard() {
    }

    public enum MotherboardType {
        MINI_ITX,
        MICRO_ATX,
        ATX,
        EATX
    }

    @Override
    public String getDescription() {
        StringBuilder builder = new StringBuilder();
        return builder
                .append("Desktop motherboard\nSize format: ").append(maxMemory)
                .append("\nMax. memory: ").append(maxMemory)
                .append("\nSocket: ").append(socket)
                .toString();
    }

    public String getSize() {
        return size;
    }

    public int getMaxMemory() {
        return maxMemory;
    }

    public String getMemoryType() {
        return memoryType;
    }

    public String getSocket() {
        return socket;
    }
}
