package com.riczz.pcbuilder.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import com.google.android.material.card.MaterialCardView;
import com.riczz.pcbuilder.R;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.HardwareType;

import java.util.HashMap;

public class ComponentButton extends MaterialCardView {

    private final Context context;
    private final TextView textView;

    private String text, initText;
    private HardwareType hardwareType;
    private Hardware selectedHardware;

    public ComponentButton(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        LayoutInflater.from(context).inflate(R.layout.component_item, this, true);

        this.context = context;
        this.textView = findViewById(R.id.componentTitle);
        this.selectedHardware = null;
        this.initText = "";

        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.ComponentCardView);
        for (int i = 0; i < a.getIndexCount(); i++) {
            String attr = a.getString(i);

            switch (a.getIndex(i)) {
                case R.styleable.ComponentCardView_text: {
                    initText = attr;
                    setText(attr);
                    break;
                }
                case R.styleable.ComponentCardView_hardwareType: {
                    setHardwareType(HardwareType.values()[Integer.parseInt(attr)]);
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

        if (initText.equals(text)) {
            textView.setTextColor(ContextCompat.getColor(context, R.color.white));
        }

        invalidate();
        requestLayout();
    }

    public void setSelectedHardware(HashMap<String, Hardware> hardwareMap) {
        if (hardwareMap.containsKey(hardwareType.name())) {
            selectedHardware = hardwareMap.get(hardwareType.name());
            textView.setTextColor(ContextCompat.getColor(context, R.color.teal_200));
            setText(selectedHardware.getName());
        }
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

    public void removeComponent() {
        this.selectedHardware = null;
        setText(initText);
    }
}
