package com.riczz.pcbuilder.adapter;

import android.content.Context;
import android.content.res.Resources;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.riczz.pcbuilder.R;
import com.riczz.pcbuilder.dao.HardwareDAO;
import com.riczz.pcbuilder.model.Hardware;
import com.riczz.pcbuilder.model.HardwareType;
import com.riczz.pcbuilder.model.ProductItem;

import java.util.ArrayList;
import java.util.Locale;

public class ProductItemAdapter
        extends RecyclerView.Adapter<ProductItemAdapter.ViewHolder> implements Filterable {

    private Context context;
    private ArrayList<ProductItem> productItems;
    private ArrayList<ProductItem> productItemsAll;
    private RecyclerViewClickListener clickListener;

    private int lastPosition = -1;

    public ProductItemAdapter(Context context, ArrayList<ProductItem> productItems, RecyclerViewClickListener listener) {
        this.context = context;
        this.productItems = productItems;
        this.productItemsAll = productItems;
        this.clickListener = listener;
    }

    @NonNull
    @Override
    public ProductItemAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.product_item, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ProductItemAdapter.ViewHolder holder, int position) {
        holder.bindTo(productItems.get(position), position);
    }

    @Override
    public int getItemCount() {
        return productItems.size();
    }

    @Override
    public Filter getFilter() {
        return productFilter;
    }

    private Filter productFilter = new Filter() {
        @Override
        protected FilterResults performFiltering(CharSequence charSequence) {
            ArrayList<ProductItem> filteredProducts = new ArrayList<>();
            FilterResults results = new FilterResults();

            if (charSequence == null || charSequence.length() == 0) {
                results.count = productItemsAll.size();
                results.values = productItemsAll;
            } else {
                String filterPattern = charSequence.toString().toLowerCase(Locale.ROOT).trim();

                for (ProductItem item : productItemsAll) {
                    if (item.getHardware().getName().toLowerCase(Locale.ROOT).contains(filterPattern)) {
                        filteredProducts.add(item);
                    }
                }
                results.count = filteredProducts.size();
                results.values = filteredProducts;
            }

            return results;
        }

        @Override
        protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
            productItems = (ArrayList<ProductItem>) filterResults.values;
            notifyDataSetChanged();
        }
    };

    class ViewHolder extends RecyclerView.ViewHolder {

        private TextView title, description, wattage, price;
        private ImageView banner, wattageIcon;
        private CardView productButton;
        private RatingBar ratingBar;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            productButton = (CardView) itemView;
            wattageIcon = itemView.findViewById(R.id.product_wattage_icon);
            description = itemView.findViewById(R.id.product_description);
            ratingBar = itemView.findViewById(R.id.product_rating);
            wattage = itemView.findViewById(R.id.product_wattage);
            banner = itemView.findViewById(R.id.product_banner);
            title = itemView.findViewById(R.id.product_title);
            price = itemView.findViewById(R.id.product_price);
        }

        private void bindTo(ProductItem item, int position) {
            Task<QuerySnapshot> task = new HardwareDAO().getHardwareById(item.getHardwareId());

            task.addOnSuccessListener(queryDocumentSnapshots -> {
                DocumentSnapshot document = queryDocumentSnapshots.getDocuments().get(0);
                String hardwareType = (String) document.get("typeName");
                Hardware hardwareObject = (Hardware) document.toObject(HardwareType.getClass(hardwareType));
                item.setHardware((Hardware) hardwareObject);

                setupView(item);
                productButton.setOnClickListener(view -> clickListener.productClickListener(position));
            });
            item.setTask(task);
        }

        private void setupView(ProductItem item) {
            Resources resources = context.getResources();
            Hardware hardware = item.getHardware();

            ratingBar.setVisibility(View.VISIBLE);
            wattageIcon.setVisibility(View.VISIBLE);

            title.setText(hardware.getName());
            ratingBar.setRating(item.getRating());
            description.setText(item.getDescription());

            this.wattage.setText(resources.getString(R.string.wattage_format, hardware.getWattage()));
            this.price.setText(
                    resources.getString(R.string.price_format,
                    String.valueOf(hardware.getPrice()),
                    resources.getString(R.string.currency))
            );
            Glide.with(context).load(hardware.getIconId()).into(banner);

            if ("0W".equals(wattage)) {
                this.wattage.setText("");
                wattageIcon.setVisibility(View.GONE);
            }
        }
    }
}
