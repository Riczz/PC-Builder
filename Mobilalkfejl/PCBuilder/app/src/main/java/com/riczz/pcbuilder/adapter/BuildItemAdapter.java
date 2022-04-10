package com.riczz.pcbuilder.adapter;

import android.app.AlertDialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.google.android.material.button.MaterialButton;
import com.riczz.pcbuilder.R;
import com.riczz.pcbuilder.model.BuildItem;

import java.util.ArrayList;

public class BuildItemAdapter extends RecyclerView.Adapter<BuildItemAdapter.ViewHolder> {

    private ArrayList<BuildItem> builds, buildsAll;
    private Context context;
    private int lastPosition = -1;

    public BuildItemAdapter(Context context, ArrayList<BuildItem> builds) {
        this.builds = this.buildsAll = builds;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.build_item, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bindTo(builds.get(position));
        holder.deleteButton.setOnClickListener(button -> {
            new AlertDialog.Builder(context)
                    .setTitle("Delete build")
                    .setMessage("Are you sure you want to delete this build?")
                    .setPositiveButton(android.R.string.yes, (dialogInterface, i) -> {
                        builds.remove(position);
                        notifyItemRemoved(position);
                        notifyItemRangeChanged(position, getItemCount());
                    })
                    .setNegativeButton(android.R.string.no, null).show();
        });
    }

    @Override
    public int getItemCount() {
        return builds.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        //TODO: Wattage
        private TextView title, wattage, price, description;
        private LinearLayout iconsLayout;
        private ImageView manufacturer;
        private MaterialButton deleteButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            title = itemView.findViewById(R.id.build_item_title);
            price = itemView.findViewById(R.id.build_item_price);
            description = itemView.findViewById(R.id.build_item_description);
            manufacturer = itemView.findViewById(R.id.build_item_cpu_manufacturer);
            deleteButton = itemView.findViewById(R.id.build_item_delete);
        }

        public void bindTo(BuildItem item) {
            title.setText(item.getTitle());
            price.setText(String.valueOf(item.getTotalPrice()));
            description.setText(item.getDescription());

            LayoutInflater inflater = LayoutInflater.from(context);

            for (int iconId : item.getIconIds()) {
                ImageView icon = (ImageView) inflater.inflate(R.layout.icon, iconsLayout, false);
                Glide.with(context).load(iconId).override(100, 100).into(icon);

            }
            Glide.with(context).load(item.getManufacturerIconId()).override(150).into(manufacturer);

        }
    }
}
