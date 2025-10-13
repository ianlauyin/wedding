use proc_macro2::TokenStream;
use quote::quote;
use syn::{DeriveInput, Ident, parse2};

#[proc_macro_derive(Collection, attributes(schema))]
pub fn collection_derive(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    collection_derive2(input.into()).into()
}

fn collection_derive2(input: TokenStream) -> TokenStream {
    let parsed: DeriveInput = parse2(input).unwrap();
    let struct_name = &parsed.ident;
    let collection_id = get_collection_id(&struct_name);
    let schema_path = get_schema_path(&parsed);

    quote!(
        impl From<firestore::FirestoreDb> for #struct_name {
            fn from(db: FirestoreDb) -> Self {
                Self(db)
            }
        }

        impl crate::db::collection::CollectionExt for #struct_name {
            type Data = #schema_path;
            fn collection_id(&self) -> &str {
                #collection_id
            }
            fn db(&self) -> &FirestoreDb {
                &self.0
            }
        }
    )
}

fn get_schema_path(parsed: &DeriveInput) -> TokenStream {
    let schema_tt = parsed
        .attrs
        .iter()
        .find(|attr| attr.path().is_ident("schema"));
    let schema_path = schema_tt.unwrap().parse_args::<syn::Path>().unwrap();
    quote!(#schema_path)
}

fn get_collection_id(struct_name: &Ident) -> String {
    let collection_name = if cfg!(debug_assertions) {
        format!("Debug{}", struct_name)
    } else {
        struct_name.to_string()
    };
    pascal_to_snake(&collection_name)
}

fn pascal_to_snake(s: &str) -> String {
    let mut result = String::new();
    let mut c_iter = s.chars().into_iter();
    result.push(c_iter.next().unwrap().to_ascii_lowercase());
    for c in c_iter {
        if c.is_uppercase() {
            result.push('_');
        }
        result.push(c.to_ascii_lowercase());
    }
    result
}
