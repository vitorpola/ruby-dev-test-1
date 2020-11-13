require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Test1
  class Application < Rails::Application
    config.load_defaults 5.2
    config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.enforce_available_locales = false
    config.i18n.available_locales = ["pt-BR"]
    config.i18n.default_locale = "pt-BR"
    config.time_zone = 'Brasilia'
    config.encoding = "utf-8"
    config.eager_load_paths << "#{Rails.root}/lib"
    config.active_record.belongs_to_required_by_default = false
  end
end
