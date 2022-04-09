package com.riczz.pcbuilder.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.google.android.material.card.MaterialCardView;
import com.riczz.pcbuilder.R;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.HardwareType;

public class ComponentButton extends MaterialCardView {

    private final TextView textView;

    private String text;
    private HardwareType hardwareType;
    private Hardware selectedHardware;

    public ComponentButton(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        LayoutInflater.from(context).inflate(R.layout.component_item, this, true);

        this.textView = findViewById(R.id.componentTitle);
        this.selectedHardware = null;

        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.ComponentCardView);
        for (int i = 0; i < a.getIndexCount(); i++) {
            int attr = a.getIndex(i);

            switch (attr) {
                case R.styleable.ComponentCardView_text: {
                    setText(a.getString(attr));
                    break;
                }
                case R.styleable.ComponentCardView_hardwareType: {
                    setHardwareType(HardwareType.values()[attr]);
                    break;
                }
            }
        }
        a.recycle();
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
        textView.setText(this.text);
        invalidate();
        requestLayout();
    }

    public void setSelectedHardware(Hardware selectedHardware) {
        this.selectedHardware = selectedHardware;
    }

    public Hardware getSelectedHardware() {
        return selectedHardware;
    }

    public HardwareType getHardwareType() {
        return hardwareType;
    }

    public void setHardwareType(HardwareType hardwareType) {
        this.hardwareType = hardwareType;
    }
}
